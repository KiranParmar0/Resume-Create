# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Create Sample Excel File (1 minute)

```bash
node create-sample-excel.js
```

This creates `Compan HR contact.xlsx` with sample data. Edit it in Excel to add your own HR contacts.

## Step 3: Prepare Your Resume (1 minute)

1. Get your resume PDF
2. Rename it to `Kiran_Parmar_Resume.pdf`
3. Place it in the project folder

## Step 4: Set Up Gmail (2 minutes)

### Get Your App Password:

1. Go to https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Scroll to **App passwords**
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password Google generates

### Add Password to Script:

Open `send-emails.js` and find this line:

```javascript
senderPassword: "your_app_password_here",
```

Replace with your 16-character password:

```javascript
senderPassword: "abcd efgh ijkl mnop",
```

## Step 5: Run the Script

```bash
npm start
```

Watch for the success messages! 🎉

---

## Need Help?

**Q: Where do I get the App Password?**  
A: https://myaccount.google.com/apppasswords (2-Step Verification must be enabled)

**Q: Excel file not found error?**  
A: Run `node create-sample-excel.js` to create the template

**Q: Can I use my regular Gmail password?**  
A: No, you MUST use the App Password (16 characters)

**Q: How long does it take?**  
A: ~5 seconds per email (with delays)

**Q: Can I change the email template?**  
A: Yes! Edit the `generateEmailBody()` function in `send-emails.js`

---

## File Checklist Before Running

- ✅ `send-emails.js` - Main script
- ✅ `package.json` - Dependencies
- ✅ `Compan HR contact.xlsx` - Excel file with HR contacts
- ✅ `Kiran_Parmar_Resume.pdf` - Your resume PDF
- ✅ Gmail App Password added to script

---

## Directory Structure

```
your-project-folder/
├── send-emails.js                 # Main script (EDIT THIS)
├── create-sample-excel.js         # Helper to create Excel template
├── send-emails-env.js             # Alternative (uses .env)
├── package.json                   # Dependencies
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── README.md                      # Detailed documentation
├── Compan HR contact.xlsx         # Your HR contacts
└── Kiran_Parmar_Resume.pdf       # Your resume
```

---

## Customization Tips

### Change Job Position
In `send-emails.js`, line 24:
```javascript
jobPosition: "Full Stack Developer Role",
```

### Change Delay Between Emails
In `send-emails.js`, line 19:
```javascript
emailDelay: 3000, // 3 seconds instead of 5
```

### Add More Company Info
Edit Excel columns and use in template:
```javascript
// In generateEmailBody():
My name is {HR_Name}, and I'm interested in {Company_Name}...
```

---

## Troubleshooting Quick Fixes

| Error | Solution |
|-------|----------|
| "Excel file not found" | Run: `node create-sample-excel.js` |
| "Resume file not found" | Rename resume to `Kiran_Parmar_Resume.pdf` |
| "Invalid login credentials" | Check your 16-char App Password |
| "Email verification failed" | Check internet connection |
| "Missing required fields" | Check Excel column names exactly |

---

## Security Note

⚠️ The App Password is like your password - keep it secret!
- Don't share it with anyone
- For production, use `.env` file instead (see send-emails-env.js)

---

Enjoy automating your job applications! 🚀
