# Configuration Guide

This guide shows you how to customize the script for different scenarios.

## Basic Configuration

All configuration is in the `CONFIG` object at the top of `send-emails.js` (around line 18):

```javascript
const CONFIG = {
  senderEmail: "parmarkiran1115@gmail.com",
  senderPassword: "your_app_password_here",
  excelFile: "Compan HR contact.xlsx",
  resumeFile: "Kiran_Parmar_Resume.pdf",
  emailDelay: 5000,
  applicantName: "Kiran Parmar",
  applicantEmail: "parmarkiran1115@gmail.com",
  applicantPhone: "7796331393",
  jobPosition: "Frontend Developer / Angular Developer Role",
  yearsExperience: 4,
};
```

---

## Common Customizations

### 1. Change Your Personal Details

```javascript
const CONFIG = {
  applicantName: "Your Name",
  applicantEmail: "your.email@gmail.com",
  applicantPhone: "9876543210",
  // ...
};
```

### 2. Change Job Position/Title

```javascript
const CONFIG = {
  jobPosition: "Full Stack Developer Role", // Change this
  yearsExperience: 3, // Change this too
  // ...
};
```

### 3. Use Different Email Provider

In `createTransporter()` function, change:

```javascript
// For Gmail
service: "gmail",

// For Outlook
service: "outlook",

// For Yahoo
service: "yahoo",

// For others, use SMTP directly:
host: "smtp.yourprovider.com",
port: 587,
secure: false,
```

### 4. Change Excel File Name

```javascript
const CONFIG = {
  excelFile: "HR_Contacts.xlsx", // Different file
  // ...
};
```

### 5. Change Resume File Name

```javascript
const CONFIG = {
  resumeFile: "My_Resume.pdf", // Different file
  // ...
};
```

### 6. Change Email Delay

```javascript
const CONFIG = {
  emailDelay: 3000, // 3 seconds (faster)
  // emailDelay: 10000, // 10 seconds (safer)
  // ...
};
```

---

## Advanced Customizations

### 1. Modify Email Subject

Find the `getEmailOptions()` function and change:

```javascript
// From:
subject: `Application for ${CONFIG.jobPosition}`,

// To:
subject: `Exciting Opportunity: ${CONFIG.jobPosition} Position`,
```

### 2. Customize Email Body

In `generateEmailBody(hrName)` function, modify the template:

```javascript
function generateEmailBody(hrName) {
  return `Dear ${hrName},

I am writing to express my strong interest in the ${CONFIG.jobPosition} position at your organization.

// Add more details here...

Best Regards,
${CONFIG.applicantName}
Email: ${CONFIG.applicantEmail}
Phone: ${CONFIG.applicantPhone}`;
}
```

### 3. Add HTML Formatting to Email

In `getEmailOptions()` function, enhance HTML version:

```javascript
html: `<html>
  <body style="font-family: Arial, sans-serif;">
    <p>Dear ${hrName},</p>
    <p>I am writing to express my strong interest...</p>
    <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
    <p>Best Regards,<br/>
    <strong>${CONFIG.applicantName}</strong><br/>
    Email: ${CONFIG.applicantEmail}<br/>
    Phone: ${CONFIG.applicantPhone}</p>
  </body>
</html>`,
```

### 4. Add Multiple Attachments

In `getEmailOptions()` function:

```javascript
attachments: [
  {
    filename: CONFIG.resumeFile,
    path: resumePath,
  },
  {
    filename: "CoverLetter.pdf",
    path: path.resolve("CoverLetter.pdf"),
  },
  {
    filename: "Portfolio.pdf",
    path: path.resolve("Portfolio.pdf"),
  },
],
```

### 5. Add CC or BCC

In `getEmailOptions()` function:

```javascript
return {
  from: CONFIG.senderEmail,
  to: hrEmail,
  cc: "manager@company.com", // Add CC
  bcc: "backup@email.com", // Add BCC
  subject: `Application for ${CONFIG.jobPosition}`,
  // ...
};
```

### 6. Personalize Based on Company

Modify the Excel file to include more columns:

```
HR_Name | Company_Name | Email | Industry | Position
```

Then use in template:

```javascript
function generateEmailBody(hrName, contact) {
  return `Dear ${hrName},

I am interested in joining ${contact.Company_Name} as a ${contact.Position}...`;
}
```

And update the email sending:

```javascript
const success = await sendEmail(
  transporter,
  contact.HR_Name,
  contact.Email,
  contact
);
```

---

## Using Environment Variables (.env)

For better security, use the `send-emails-env.js` version:

### 1. Install dotenv

```bash
npm install dotenv
```

### 2. Create .env file

Copy `.env.example` to `.env`:

```bash
# Windows PowerShell
Copy-Item ".env.example" ".env"

# Or manually create .env with:
SENDER_EMAIL=parmarkiran1115@gmail.com
SENDER_PASSWORD=xxxx xxxx xxxx xxxx
APPLICANT_NAME=Kiran Parmar
APPLICANT_EMAIL=parmarkiran1115@gmail.com
APPLICANT_PHONE=7796331393
JOB_POSITION=Frontend Developer Role
YEARS_EXPERIENCE=4
EMAIL_DELAY=5000
```

### 3. Use the env version

```bash
# Option 1: Rename
mv send-emails.js send-emails-original.js
mv send-emails-env.js send-emails.js

# Option 2: Update package.json scripts
"scripts": {
  "start": "node send-emails-env.js"
}

# Then run:
npm start
```

---

## Different Email Scenarios

### Scenario 1: Frontend Developer with React

```javascript
const CONFIG = {
  jobPosition: "React Developer Position",
  yearsExperience: 5,
  applicantName: "Your Name",
  // ...
};
```

### Scenario 2: Backend Developer with Node.js

```javascript
const CONFIG = {
  jobPosition: "Node.js Backend Developer",
  yearsExperience: 3,
  applicantName: "Your Name",
  // ...
};
```

### Scenario 3: Full Stack Developer

```javascript
const CONFIG = {
  jobPosition: "Full Stack Developer Position",
  yearsExperience: 4,
  applicantName: "Your Name",
  // ...
};
```

### Scenario 4: Internship Application

```javascript
function generateEmailBody(hrName) {
  return `Dear ${hrName},

I am a final year engineering student interested in the internship opportunity at your company.

// Rest of template...`;
}
```

---

## Debugging Configuration

### Log All Settings

Add at the start of `main()` function:

```javascript
console.log("Current Configuration:");
console.log(`Email From: ${CONFIG.senderEmail}`);
console.log(`Excel File: ${CONFIG.excelFile}`);
console.log(`Resume File: ${CONFIG.resumeFile}`);
console.log(`Email Delay: ${CONFIG.emailDelay}ms`);
console.log(`Applicant: ${CONFIG.applicantName}`);
console.log(`Position: ${CONFIG.jobPosition}`);
console.log("");
```

### Test Configuration

Create a test file `test-config.js`:

```javascript
const CONFIG = require("./send-emails.js").CONFIG;

console.log("Configuration loaded:");
console.log(CONFIG);
```

---

## Excel File Customization

### Add Extra Columns

You can add more columns to Excel:

```
HR_Name | Company_Name | Email | Position | Industry | Contact_Phone
```

Use them in template:

```javascript
// Modify generateEmailBody to accept contact object
function generateEmailBody(contact) {
  return `Dear ${contact.HR_Name},

I am interested in the ${contact.Position} role at ${contact.Company_Name}...`;
}
```

### Use Category Column

Excel columns:

```
HR_Name | Company_Name | Email | Category
```

Filter by category:

```javascript
const filteredContacts = hrContacts.filter(
  (c) => c.Category === "Priority"
);
```

---

## Performance Optimization

### 1. Increase Delay for Safety

```javascript
emailDelay: 10000, // 10 seconds (safer for spam filters)
```

### 2. Reduce Delay for Speed

```javascript
emailDelay: 2000, // 2 seconds (faster but riskier)
```

### 3. Batch Processing

Send in smaller batches with longer delay between batches:

```javascript
const batchSize = 5;
const batchDelay = 60000; // 1 minute between batches

for (let i = 0; i < hrContacts.length; i += batchSize) {
  const batch = hrContacts.slice(i, i + batchSize);
  // Send batch...
  if (i + batchSize < hrContacts.length) {
    await new Promise((r) => setTimeout(r, batchDelay));
  }
}
```

---

## Testing Changes

### Test with One Contact

1. Create Excel with one HR contact
2. Run: `npm start`
3. Check email was sent correctly
4. Then add more contacts

### Test Email Body

1. Send test email to yourself
2. Check formatting
3. Verify all personalization works
4. Then send to others

### Dry Run (Don't Send)

Add a check before sending:

```javascript
if (process.argv.includes("--dry-run")) {
  console.log("DRY RUN: Would send to", contact.Email);
  continue;
}
```

Run with: `node send-emails.js --dry-run`

---

## Rollback Changes

If something breaks:

1. Keep backup of original file
2. Make one change at a time
3. Test thoroughly
4. Then proceed to next change

Restore original:
```bash
git checkout send-emails.js
# Or restore from backup
```

---

For more help, see:
- README.md - Full documentation
- QUICK_START.md - Quick setup guide
- TROUBLESHOOTING.md - Problem solutions
