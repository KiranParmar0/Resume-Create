/**
 * Advanced Job Application Email Automation Script
 * Features: Parallel email sending, automatic bounce tracking, real-time Excel cleanup
 */

const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

/**
 * Configuration object
 */
const CONFIG = {
  senderEmail: "kiranparmar7796@gmail.com",
  senderPassword: "cchn jwxo ykut zihj", // Use App Password for Gmail
  excelFile: "Compan HR contact.xlsx",
  resumeFile: "Kiran_Parmar_Resume.pdf",
  emailDelay: 2000, // 2 seconds delay between parallel batches
  batchSize: 5, // Send 5 emails in parallel at a time
  applicantName: "Kiran Parmar",
  applicantEmail: "kiranparmar7796@gmail.com",
  applicantPhone: "7796331393",
  jobPosition: "Frontend Developer / Angular Developer Role",
  yearsExperience: 4,
};

// Track failed emails for removal
let failedEmails = [];

/**
 * Email transporter configuration
 */
async function createTransporter() {
  // For Gmail, use an App Password instead of regular password
  // Generate App Password: https://myaccount.google.com/apppasswords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: CONFIG.senderEmail,
      pass: CONFIG.senderPassword,
    },
  });

  // Verify transporter connection
  try {
    await transporter.verify();
    console.log("✓ Email transporter verified successfully\n");
  } catch (error) {
    console.error("✗ Email transporter verification failed:", error.message);
    throw error;
  }

  return transporter;
}

/**
 * Read Excel file and extract HR contacts
 */
function readExcelFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`✓ Excel file read successfully`);
    console.log(`✓ Found ${data.length} HR contacts\n`);

    return data;
  } catch (error) {
    console.error("✗ Error reading Excel file:", error.message);
    throw error;
  }
}

/**
 * Generate personalized email body
 */
function generateEmailBody(hrName) {
  return `Dear ${hrName},


My name is ${CONFIG.applicantName}, and I have ${CONFIG.yearsExperience} years of experience in frontend development specializing in Angular, JavaScript, and modern web technologies.

Please find my resume attached for your consideration.

I would welcome the opportunity to discuss how my experience and skills could benefit your team.

Thank you for your time and consideration.

Best Regards,
${CONFIG.applicantName}
Email: ${CONFIG.applicantEmail}
Phone: ${CONFIG.applicantPhone}`;
}

/**
 * Get email options with attachment
 */
function getEmailOptions(hrName, hrEmail, companyName) {
  const resumePath = path.resolve(CONFIG.resumeFile);

  // Check if resume file exists
  if (!fs.existsSync(resumePath)) {
    throw new Error(`Resume file not found: ${resumePath}`);
  }

  return {
    from: CONFIG.senderEmail,
    to: hrEmail,
    subject: `Application for ${CONFIG.jobPosition}`,
    text: generateEmailBody(hrName),
    html: generateEmailBody(hrName).replace(/\n/g, "<br>"),
    attachments: [
      {
        filename: CONFIG.resumeFile,
        path: resumePath,
      },
    ],
  };
}

/**
 * Send email to individual HR contact
 */
async function sendEmail(transporter, hrName, hrEmail, companyName) {
  try {
    const mailOptions = getEmailOptions(hrName, hrEmail, companyName);
    await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${hrEmail} (${companyName})`);
    return true;
  } catch (error) {
    console.error(`✗ Error sending email to ${hrEmail}: ${error.message}`);
    
    // Track failed emails for automatic removal
    failedEmails.push(hrEmail);
    return false;
  }
}

/**
 * Remove failed emails from Excel file
 */
function removeFailedEmailsFromExcel() {
  if (failedEmails.length === 0) return;

  try {
    console.log(`\n📝 Removing ${failedEmails.length} failed emails from Excel file...`);
    
    const workbook = XLSX.readFile(CONFIG.excelFile);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Filter out failed emails
    const cleanedData = data.filter(contact => !failedEmails.includes(contact.Email));

    // Write back to Excel
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(cleanedData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");
    XLSX.writeFile(newWorkbook, CONFIG.excelFile);

    console.log(`✓ Excel file updated: Removed ${failedEmails.length} invalid emails`);
    console.log(`✓ New total: ${cleanedData.length} valid contacts\n`);
  } catch (error) {
    console.error("✗ Error updating Excel file:", error.message);
  }
}

/**
 * Send emails in parallel batches
 */
async function sendEmailsInBatches(transporter, hrContacts) {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < hrContacts.length; i += CONFIG.batchSize) {
    const batch = hrContacts.slice(i, i + CONFIG.batchSize);
    
    console.log(`\n📧 Batch ${Math.floor(i / CONFIG.batchSize) + 1}/${Math.ceil(hrContacts.length / CONFIG.batchSize)} (${batch.length} emails)\n`);

    // Send emails in parallel (all at once)
    const results = await Promise.all(
      batch.map(contact => {
        // Validate required fields
        if (!contact.Name || !contact.Email || !contact.Company) {
          console.error(`✗ Skipping: Missing required fields for ${contact.Email || 'unknown'}`);
          failCount++;
          return false;
        }

        return sendEmail(transporter, contact.Name, contact.Email, contact.Company);
      })
    );

    // Count results
    results.forEach(success => {
      if (success) successCount++;
      else failCount++;
    });

    // Delay between batches (except after the last one)
    if (i + CONFIG.batchSize < hrContacts.length) {
      console.log(`⏳ Waiting ${CONFIG.emailDelay / 1000}s before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.emailDelay));
    }
  }

  return { successCount, failCount };
}


async function main() {
  console.log("========================================");
  console.log("  Job Application Email Automation");
  console.log("  (Parallel Sending with Auto-Cleanup)");
  console.log("========================================\n");

  try {
    // Step 1: Create email transporter
    console.log("Step 1: Initializing email transporter...");
    const transporter = await createTransporter();

    // Step 2: Read Excel file
    console.log("Step 2: Reading Excel file...");
    const hrContacts = readExcelFile(CONFIG.excelFile);

    // Step 3: Send emails in parallel batches
    console.log(`Step 3: Sending emails (${CONFIG.batchSize} in parallel)...\n`);
    const { successCount, failCount } = await sendEmailsInBatches(transporter, hrContacts);

    // Step 4: Remove failed emails from Excel
    removeFailedEmailsFromExcel();

    // Step 5: Summary
    console.log("========================================");
    console.log("  Email Campaign Summary");
    console.log("========================================");
    console.log(`Total HR Contacts: ${hrContacts.length}`);
    console.log(`✓ Successful: ${successCount}`);
    console.log(`✗ Failed/Invalid: ${failCount}`);
    console.log("========================================\n");

    if (failCount === 0) {
      console.log("🎉 All emails sent successfully!");
    } else if (successCount > 0) {
      console.log(`⚠️  Sent ${successCount} emails, but ${failCount} failed.`);
      console.log(`💡 Failed emails automatically removed from Excel file.`);
    } else {
      console.log("❌ Failed to send any emails. Please check the error logs above.");
    }
  } catch (error) {
    console.error("❌ Fatal Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
