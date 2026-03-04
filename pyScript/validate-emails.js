/**
 * Email Validation and Excel Cleanup Script
 * Removes rows with invalid email addresses from the Excel file
 */

const XLSX = require("xlsx");
const fs = require("fs");

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  return emailRegex.test(email.trim());
}

/**
 * Main function to clean Excel file
 */
function cleanExcelFile(fileName) {
  try {
    console.log("========================================");
    console.log("  Email Validation & Cleanup");
    console.log("========================================\n");

    // Read Excel file
    console.log(`Reading Excel file: ${fileName}...`);
    const workbook = XLSX.readFile(fileName);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`✓ Found ${data.length} total contacts\n`);

    // Validate and filter data
    const validContacts = [];
    const invalidContacts = [];

    data.forEach((contact, index) => {
      if (isValidEmail(contact.Email)) {
        validContacts.push(contact);
      } else {
        invalidContacts.push({
          row: index + 2, // +2 because Excel is 1-indexed and headers are row 1
          email: contact.Email || "(empty)",
          name: contact.Name || "N/A",
        });
      }
    });

    // Show invalid emails
    console.log(`❌ Invalid Emails Found: ${invalidContacts.length}`);
    if (invalidContacts.length > 0) {
      console.log("\nInvalid email samples:");
      invalidContacts.slice(0, 10).forEach((invalid) => {
        console.log(
          `  Row ${invalid.row}: ${invalid.name} - ${invalid.email}`
        );
      });
      if (invalidContacts.length > 10) {
        console.log(`  ... and ${invalidContacts.length - 10} more\n`);
      } else {
        console.log();
      }
    }

    console.log(`✓ Valid Emails: ${validContacts.length}\n`);

    // Create backup
    const backupFileName = fileName.replace(".xlsx", "_backup.xlsx");
    console.log(`Creating backup: ${backupFileName}`);
    XLSX.writeFile(workbook, backupFileName);
    console.log("✓ Backup created\n");

    // Write cleaned data back to Excel
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(validContacts);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");
    XLSX.writeFile(newWorkbook, fileName);

    console.log("========================================");
    console.log(`✓ Cleaned file saved: ${fileName}`);
    console.log("========================================");
    console.log(`Summary:`);
    console.log(`  Original: ${data.length} contacts`);
    console.log(`  Removed: ${invalidContacts.length} (invalid emails)`);
    console.log(`  Cleaned: ${validContacts.length} contacts`);
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanExcelFile("Compan HR contact.xlsx");
