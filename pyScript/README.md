# Job Application Email Automation Script

A Node.js automation script that sends personalized job application emails to multiple HR contacts using data from an Excel file.

## Features

✅ Reads HR contact details from an Excel file (.xlsx)  
✅ Sends personalized emails with template customization  
✅ Attaches resume PDF to each email  
✅ Error handling and logging  
✅ 5-second delay between emails to avoid spam detection  
✅ Async/await implementation  
✅ Progress tracking and summary report  

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Gmail Account** with App Password enabled
- **Excel file** with HR contact details
- **Resume PDF file**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `nodemailer` - For sending emails
- `xlsx` - For reading Excel files

### 2. Prepare Excel File

Create an Excel file named `Compan HR contact.xlsx` in the project folder with the following columns:

| HR_Name | Company_Name | Email |
|---------|--------------|-------|
| John Doe | Company A | john@companya.com |
| Jane Smith | Company B | jane@companyb.com |
| Mike Johnson | Company C | mike@companyc.com |

**Column Names MUST be exactly:**
- `HR_Name` - Name of the HR representative
- `Company_Name` - Name of the company
- `Email` - Email address of the HR contact

### 3. Prepare Resume File

Place your resume PDF file named `Kiran_Parmar_Resume.pdf` in the project folder.

### 4. Configure Gmail Credentials

#### Generate Gmail App Password:

1. Go to [Google Account](https://myaccount.google.com/)
2. Click on **Security** (left sidebar)
3. Enable **2-Step Verification** if not already enabled
4. Go back to Security → **App passwords**
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password

#### Update Script with Credentials:

Open `send-emails.js` and find this line (around line 18):

```javascript
senderPassword: "your_app_password_here", // Use App Password for Gmail
```

Replace `your_app_password_here` with your generated 16-character App Password:

```javascript
senderPassword: "xxxx xxxx xxxx xxxx", // Your actual App Password
```

### 5. Customize Email Template (Optional)

Edit these variables in `send-emails.js` (around lines 18-24):

```javascript
const CONFIG = {
  senderEmail: "parmarkiran1115@gmail.com", // Your email
  applicantName: "Kiran Parmar", // Your name
  applicantEmail: "parmarkiran1115@gmail.com", // Your email
  applicantPhone: "7796331393", // Your phone
  jobPosition: "Frontend Developer / Angular Developer Role", // Job title
  yearsExperience: 4, // Your years of experience
};
```

## Running the Script

### Basic Usage

```bash
npm start
```

Or:

```bash
node send-emails.js
```

### Example Output

```
========================================
  Job Application Email Automation
========================================

Step 1: Initializing email transporter...
✓ Email transporter verified successfully

Step 2: Reading Excel file...
✓ Excel file read successfully
✓ Found 3 HR contacts

Step 3: Sending emails...

✓ Email sent to: john@companya.com
  HR Name: John Doe
  Company: Company A
  Message ID: <example@gmail.com>

⏳ Waiting 5 seconds before next email...

✓ Email sent to: jane@companyb.com
  HR Name: Jane Smith
  Company: Company B
  Message ID: <example@gmail.com>

⏳ Waiting 5 seconds before next email...

✓ Email sent to: mike@companyc.com
  HR Name: Mike Johnson
  Company: Company C
  Message ID: <example@gmail.com>

========================================
  Email Campaign Summary
========================================
Total HR Contacts: 3
✓ Successful: 3
✗ Failed: 0
========================================

🎉 All emails sent successfully!
```

## File Structure

```
.
├── send-emails.js              # Main automation script
├── package.json                # Project dependencies
├── README.md                   # This file
├── Compan HR contact.xlsx      # Excel file with HR contacts (you create this)
└── Kiran_Parmar_Resume.pdf     # Resume PDF (you create this)
```

## Email Template

The script sends emails with this template:

```
Dear {HR_Name},


My name is Kiran Parmar, and I have 4 years of experience in frontend development 
specializing in Angular, JavaScript, and modern web technologies.

Please find my resume attached for your consideration.

I would welcome the opportunity to discuss how my experience and skills could 
benefit your team.

Thank you for your time and consideration.

Best Regards,
Kiran Parmar
Email: parmarkiran1115@gmail.com
Phone: 7796331393
```

## Features Explained

### Delay Between Emails
- 5-second delay between emails prevents Gmail from marking emails as spam
- Customizable in `send-emails.js` at `emailDelay: 5000`: (value in milliseconds)

### Error Handling
- Validates Excel file exists
- Validates resume file exists
- Validates required columns in Excel
- Catches and logs email sending errors
- Returns summary of success/failure count

### Async/Await
- Uses promises for email sending
- Proper delay handling with Promise
- Clean error handling with try-catch blocks

## Troubleshooting

### Error: "Excel file not found"
- Make sure `Compan HR contact.xlsx` is in the same folder as `send-emails.js`
- Check file name spelling and case

### Error: "Resume file not found"
- Make sure `Kiran_Parmar_Resume.pdf` is in the same folder as `send-emails.js`
- Check file name spelling

### Error: "Invalid login credentials"
- Verify you're using the **App Password** (16 characters), not your regular Gmail password
- Make sure 2-Step Verification is enabled on your Gmail account
- Regenerate the App Password if needed

### Error: "Email transporter verification failed"
- Check internet connection
- Verify Gmail credentials are correct
- Ensure your Gmail account has SMTP enabled

### Missing columns error
- Excel column names MUST be exactly: `HR_Name`, `Company_Name`, `Email`
- Check for extra spaces in column headers
- Column names are case-sensitive

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your App Password to version control
- The App Password is 16 characters provided by Google
- Create a `.env` file for sensitive data in production
- Don't share your credentials with others

### Better Practice with .env File

For production, create a `.env` file:

```
SENDER_EMAIL=parmarkiran1115@gmail.com
SENDER_PASSWORD=xxxx xxxx xxxx xxxx
```

Then install `dotenv`:
```bash
npm install dotenv
```

And update `send-emails.js`:
```javascript
require("dotenv").config();

const CONFIG = {
  senderEmail: process.env.SENDER_EMAIL,
  senderPassword: process.env.SENDER_PASSWORD,
  // ...
};
```

## Customization Examples

### Change email subject
In `send-emails.js`, find the `getEmailOptions()` function:
```javascript
subject: `Application for ${CONFIG.jobPosition}`,
```

### Change sender name in email body
In `send-emails.js`, find the `generateEmailBody()` function and modify the template.

### Add more attachments
In the `getEmailOptions()` function, add to the `attachments` array:
```javascript
attachments: [
  { filename: "Resume.pdf", path: "./Kiran_Parmar_Resume.pdf" },
  { filename: "CoverLetter.txt", path: "./cover_letter.txt" } // Add this
]
```

## Performance

- Sending 100 emails with 5-second delays = ~500 seconds (~8.3 minutes)
- Adjust delay in CONFIG if needed (minimum 2-3 seconds recommended)
- Script processes emails sequentially to avoid spam filters

## Support & Issues

If you encounter any issues:
1. Check the error message carefully
2. Verify all file paths and names
3. Ensure Gmail App Password is correct
4. Check internet connection
5. Try running the script again

## License

MIT License - Free to use and modify

## Author

Kiran Parmar
Email: parmarkiran1115@gmail.com
Phone: 7796331393
