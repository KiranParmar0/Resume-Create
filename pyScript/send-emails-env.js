/**
 * OPTIONAL: Enhanced version using .env file for security
 * 
 * To use this version:
 * 1. Install dotenv: npm install dotenv
 * 2. Copy .env.example to .env and fill in your credentials
 * 3. Replace the original send-emails.js with this version
 * 4. Run: npm start
 */

const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Optional: Uncomment if you have dotenv installed
// require("dotenv").config();

/**
 * Configuration object (supports both hardcoded and environment variables)
 */
const CONFIG = {
  // Gmail Configuration
  senderEmail: process.env.SENDER_EMAIL || "kiranparmar7796@gmail.com",
  senderPassword: process.env.SENDER_PASSWORD || "Kp936300007@", // Use App Password for Gmail

  // File Names
  excelFile: process.env.EXCEL_FILE || "Compan HR contact.xlsx",
  resumeFile: process.env.RESUME_FILE || "Kiran_Parmar_Resume.pdf",

  // Timing
  emailDelay: parseInt(process.env.EMAIL_DELAY) || 5000,

  // Applicant Information
  applicantName: process.env.APPLICANT_NAME || "Kiran Parmar",
  applicantEmail: process.env.APPLICANT_EMAIL || "kiranparmar7796@gmail.com",
  applicantPhone: process.env.APPLICANT_PHONE || "7796331393",

  // Job Details
  jobPosition:
    process.env.JOB_POSITION || "Frontend Developer / Angular Developer Role",
  yearsExperience: parseInt(process.env.YEARS_EXPERIENCE) || 4,
};

/**
 * Email transporter configuration
 */
async function createTransporter() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: CONFIG.senderEmail,
      pass: CONFIG.senderPassword,
    },
  });

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
 * Send email to a single HR contact
 */
async function sendEmail(transporter, hrName, hrEmail, companyName) {
  try {
    const mailOptions = getEmailOptions(hrName, hrEmail, companyName);

    const info = await transporter.sendMail(mailOptions);

    console.log(`✓ Email sent to: ${hrEmail}`);
    console.log(`  HR Name: ${hrName}`);
    console.log(`  Company: ${companyName}`);
    console.log(`  Message ID: ${info.messageId}\n`);

    return true;
  } catch (error) {
    console.error(`✗ Error sending email to ${hrEmail}:`);
    console.error(`  Error: ${error.message}\n`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("========================================");
  console.log("  Job Application Email Automation");
  console.log("========================================\n");

  try {
    console.log("Step 1: Initializing email transporter...");
    const transporter = await createTransporter();

    console.log("Step 2: Reading Excel file...");
    const hrContacts = readExcelFile(CONFIG.excelFile);

    console.log("Step 3: Sending emails...\n");
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < hrContacts.length; i++) {
      const contact = hrContacts[i];

      if (!contact.HR_Name || !contact.Email || !contact.Company_Name) {
        console.error(`✗ Skipping row ${i + 1}: Missing required fields\n`);
        failCount++;
        continue;
      }

      const success = await sendEmail(
        transporter,
        contact.HR_Name,
        contact.Email,
        contact.Company_Name
      );

      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      if (i < hrContacts.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.emailDelay / 1000} seconds...\n`);
        await new Promise((resolve) => setTimeout(resolve, CONFIG.emailDelay));
      }
    }

    console.log("========================================");
    console.log("  Email Campaign Summary");
    console.log("========================================");
    console.log(`Total HR Contacts: ${hrContacts.length}`);
    console.log(`✓ Successful: ${successCount}`);
    console.log(`✗ Failed: ${failCount}`);
    console.log("========================================\n");

    if (failCount === 0) {
      console.log("🎉 All emails sent successfully!");
    } else if (successCount > 0) {
      console.log(`⚠️  Sent ${successCount} emails, but ${failCount} failed.`);
    }
  } catch (error) {
    console.error("❌ Fatal Error:", error.message);
    process.exit(1);
  }
}

main();
