/**
 * Helper script to create a sample Excel file with HR contacts
 * 
 * Usage: node create-sample-excel.js
 * This will create a file named "Compan HR contact.xlsx" with sample data
 */

const XLSX = require("xlsx");
const path = require("path");

// Sample HR contact data
const sampleData = [
  {
    HR_Name: "John Doe",
    Company_Name: "Tech Innovations Inc.",
    Email: "john.doe@techinnovations.com",
  },
  {
    HR_Name: "Sarah Johnson",
    Company_Name: "Digital Solutions Ltd.",
    Email: "sarah.johnson@digitalsolutions.com",
  },
  {
    HR_Name: "Michael Chen",
    Company_Name: "CloudTech Systems",
    Email: "mchen@cloudtech.com",
  },
  {
    HR_Name: "Emily Rodriguez",
    Company_Name: "WebDev Pro Services",
    Email: "emily@webdevpro.com",
  },
  {
    HR_Name: "David Kumar",
    Company_Name: "Frontend Masters",
    Email: "david.kumar@frontendmasters.com",
  },
];

function createSampleExcelFile() {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add worksheet with data
    const worksheet = XLSX.utils.json_to_sheet(sampleData);

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 20 }, // HR_Name
      { wch: 25 }, // Company_Name
      { wch: 35 }, // Email
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "HR Contacts");

    // Write file
    const fileName = "Compan HR contact.xlsx";
    XLSX.writeFile(workbook, fileName);

    console.log("✓ Sample Excel file created successfully!");
    console.log(`✓ File name: ${fileName}`);
    console.log(`✓ Location: ${path.resolve(fileName)}`);
    console.log(`✓ Sample records: ${sampleData.length}`);
    console.log("\n📝 Sample data included:");
    console.log("─".repeat(70));

    sampleData.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.HR_Name}`);
      console.log(`   Company: ${contact.Company_Name}`);
      console.log(`   Email: ${contact.Email}`);
    });

    console.log("─".repeat(70));
    console.log(
      "\n💡 You can now edit this file in Excel to add your own HR contacts."
    );
    console.log(
      "📌 Make sure to keep the column headers: HR_Name, Company_Name, Email"
    );
  } catch (error) {
    console.error("✗ Error creating Excel file:", error.message);
    process.exit(1);
  }
}

// Run the function
createSampleExcelFile();
