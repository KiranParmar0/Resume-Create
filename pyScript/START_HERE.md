# 🚀 Complete Setup Guide - Start Here!

Welcome to the Job Application Email Automation Script!

This guide will get you up and running in **less than 5 minutes**.

---

## ✅ What You're Getting

A complete Node.js automation system that:
- ✨ Reads HR contacts from Excel file
- 📧 Sends personalized job application emails
- 📎 Attaches your resume to each email
- ⏳ Automatically waits 5 seconds between emails (anti-spam)
- 🎯 Includes personalization and error handling
- 🔒 Full error logging and success reporting

---

## 📋 Quick Checklist - 5 Minutes to Success

### Step 1: Install Dependencies (1 minute)

Open PowerShell in the project folder and run:

```powershell
npm install
```

This installs `nodemailer` (email library) and `xlsx` (Excel reader).

✅ **Expected Result:** See "added XX packages"

---

### Step 2: Prepare Your Files (1 minute)

✅ Check if these files exist:

- **`Compan HR contact.xlsx`** - Excel file with HR contacts (should already exist)
- **`Kiran_Parmar_Resume.pdf`** - Your resume PDF (should already exist)

If missing:
```powershell
node create-sample-excel.js  # Creates sample Excel file
```

---

### Step 3: Set Up Gmail (2 minutes)

1. Go to: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Scroll down to **App passwords**
4. Select "Mail" and "Windows Computer"
5. **Copy** the 16-character password Google generates

---

### Step 4: Configure Script (30 seconds)

Open `send-emails.js` in VS Code and find this (around line 18):

```javascript
const CONFIG = {
  senderEmail: "parmarkiran1115@gmail.com",
  senderPassword: "your_app_password_here",  // ← REPLACE THIS
```

Paste your 16-character password:

```javascript
  senderPassword: "abcd efgh ijkl mnop",  // ← YOUR APP PASSWORD
```

⚠️ **IMPORTANT:** Use the App Password (16 chars), not your Gmail password!

---

### Step 5: Run the Script (30 seconds)

Open PowerShell and run:

```powershell
npm start
```

🎉 **That's it!** Watch the console for success messages!

---

## 📊 Expected Output

You should see something like:

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

✓ Email sent to: john@company.com
  HR Name: John Doe
  Company: Company A

⏳ Waiting 5 seconds before next email...

✓ Email sent to: jane@company.com
  HR Name: Jane Smith
  Company: Company B

========================================
  Email Campaign Summary
========================================
Total HR Contacts: 2
✓ Successful: 2
✗ Failed: 0
========================================

🎉 All emails sent successfully!
```

---

## 📁 Project Files Overview

| File | Purpose |
|------|---------|
| **send-emails.js** | Main script - the core automation |
| **package.json** | Project dependencies |
| **create-sample-excel.js** | Helper to generate sample Excel |
| **README.md** | Full detailed documentation |
| **QUICK_START.md** | 5-minute quick setup |
| **.env.example** | Template for secure config |
| **run.bat** | Windows menu (double-click to run) |

---

## 🎯 What to Customize

Edit **`send-emails.js`** and change these (around line 18-24):

```javascript
const CONFIG = {
  senderEmail: "parmarkiran1115@gmail.com",      // ← Your email
  applicantName: "Kiran Parmar",                 // ← Your name
  applicantEmail: "parmarkiran1115@gmail.com",   // ← Your email
  applicantPhone: "7796331393",                  // ← Your phone
  jobPosition: "Frontend Developer / Angular Developer Role", // ← Your position
  yearsExperience: 4,                            // ← Your experience
};
```

---

## 📊 Excel File Format

Your `Compan HR contact.xlsx` should look like this:

| HR_Name | Company_Name | Email |
|---------|--------------|-------|
| John Doe | Tech Corp | john@techcorp.com |
| Sarah Smith | Cloud Systems | sarah@cloud.com |
| Mike Johnson | Web Dev Inc | mike@webdev.com |

**Important:** Column names must be EXACTLY: `HR_Name`, `Company_Name`, `Email`

---

## ❌ If Something Goes Wrong

### Error: "Excel file not found"
```powershell
# Create the file:
node create-sample-excel.js
# Then edit in Excel to add your contacts
```

### Error: "Invalid login credentials"
- Did you copy the **16-character App Password**? (not your Gmail password)
- Check for extra spaces when pasting

### Error: "Resume file not found"
- Make sure file is named exactly: `Kiran_Parmar_Resume.pdf`
- Place it in the same folder as `send-emails.js`

### Script doesn't run
```powershell
# Make sure dependencies are installed:
npm install

# Check Node.js is installed:
node --version  # Should show v14 or higher
```

---

## 🔒 Security Note

⚠️ The App Password is sensitive - keep it secret!

**For Production (Optional):**
1. Use `.env` file instead (more secure)
2. See CONFIGURATION.md for details
3. Never commit `.env` to Git

---

## 📚 Need More Help?

| Question | See File |
|----------|----------|
| How do I set this up? | QUICK_START.md |
| Full documentation | README.md |
| I got an error | TROUBLESHOOTING.md |
| How do I customize? | CONFIGURATION.md |
| What files are there? | PROJECT_STRUCTURE.md |

---

## 🎨 Customize Email Template

The default email template looks like:

```
Dear {HR_Name},


My name is Kiran Parmar, and I have 4 years of experience 
in frontend development specializing in Angular, JavaScript, 
and modern web technologies.

Please find my resume attached for your consideration.

I would welcome the opportunity to discuss how my experience 
and skills could benefit your team.

Thank you for your time and consideration.

Best Regards,
Kiran Parmar
Email: parmarkiran1115@gmail.com
Phone: 7796331393
```

To change it, edit the `generateEmailBody()` function in `send-emails.js` (around line 66).

---

## ⚙️ Easy Windows Menu

Double-click **`run.bat`** for an interactive menu:

```
1. Install Dependencies
2. Create Sample Excel File
3. Send Emails Now
4. View Documentation
5. Exit
```

---

## 🚀 Advanced Features

### Delay Between Emails
Change line 19 in `send-emails.js`:
```javascript
emailDelay: 5000,  // 5 seconds (safe)
// emailDelay: 10000,  // 10 seconds (safer)
// emailDelay: 2000,   // 2 seconds (faster)
```

### Multiple Attachments
See CONFIGURATION.md section "Add Multiple Attachments"

### Different Email Provider
See CONFIGURATION.md section "Use Different Email Provider"

### Environment Variables (.env)
See send-emails-env.js and .env.example

---

## 📞 Common Questions

**Q: Can I template the email text?**  
A: Yes! Edit `generateEmailBody()` in send-emails.js

**Q: Can I add more attachments?**  
A: Yes! Edit the `attachments` array in `getEmailOptions()`

**Q: How long does it take?**  
A: ~5 seconds per email (with built-in delays)

**Q: Can I test with one email?**  
A: Yes! Create Excel with just one contact first

**Q: Will Gmail block mass emails?**  
A: No, the 5-second delays help avoid spam filters

**Q: Can I use a different email provider?**  
A: Yes! See CONFIGURATION.md

---

## 📊 What Happens

1. **Script reads** `Compan HR contact.xlsx`
2. **For each HR contact:**
   - Creates personalized email with {HR_Name}
   - Attaches your resume PDF
   - Sends via Gmail
   - Logs success/error
   - **Waits 5 seconds** (prevents spam detection)
3. **Shows summary** with success/failure count

---

## ✅ Pre-Flight Checklist

Before running, verify:

- [ ] Node.js installed (`node --version` shows v14+)
- [ ] Dependencies installed (`npm install` run)
- [ ] Gmail App Password created (16 characters)
- [ ] send-emails.js updated with App Password
- [ ] Compan HR contact.xlsx exists with data
- [ ] Kiran_Parmar_Resume.pdf exists
- [ ] Excel columns are: HR_Name, Company_Name, Email

---

## 🎯 Your Next Steps

**Right now:**
1. ✅ Installation done (files are ready)
2. 📊 Check your Excel file has HR contacts
3. 🔑 Get your Gmail App Password (2 min)
4. ✏️ Update send-emails.js (30 sec)
5. 🚀 Run: `npm start`

**That's it!** 🎉

---

## 💡 Pro Tips

- **Test first:** Create Excel with 1 contact, run script
- **Check spam:** Emails might go to spam initially
- **Personalize:** Edit template to match your style
- **Batch:** Send to 5 contacts, wait a day, send more
- **Track:** Keep Excel file updated with sent status

---

## 🆘 Stuck?

1. Read error message carefully
2. Search TROUBLESHOOTING.md for that error
3. Follow the solution steps
4. Try again

**Most common fix:** Wrong App Password - verify you're using the 16-character App Password from Google, not your regular Gmail password.

---

## 📖 Full Documentation

- **QUICK_START.md** - Fast setup (recommended)
- **README.md** - Detailed docs
- **TROUBLESHOOTING.md** - Error solutions
- **CONFIGURATION.md** - Advanced options
- **PROJECT_STRUCTURE.md** - File guide

---

## 🎉 Success!

Once emails are sent, you should see:

```
🎉 All emails sent successfully!
```

Now wait for replies from interested companies! 💼

---

**Happy automating!** ✨

For detailed help, start with **QUICK_START.md**
