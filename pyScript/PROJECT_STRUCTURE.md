# Project Files Index

Complete guide to all files in this project.

## Core Application Files

### 📄 `send-emails.js` ⭐ **START HERE**
**Main automation script**

- Reads HR contacts from Excel file
- Sends personalized job application emails
- Includes resume attachment
- Error handling and logging
- 5-second delay between emails
- Uses async/await

**What to do:**
1. Update the `CONFIG` object with your details
2. Add your Gmail App Password
3. Run: `npm start`

**Key customizations:**
- Line 10-24: `CONFIG` object (personalize this)
- Line 53-60: Email subject line
- Line 55-60: Email body template

---

### 📦 `package.json`
**Project dependencies and metadata**

Contains:
- Project name, version, description
- npm dependencies: `nodemailer`, `xlsx`
- Scripts: `npm start` to run the app
- Engine requirement: Node.js v14+

**When to use:**
- `npm install` - Install dependencies first
- Auto-used by npm when running scripts

**Don't modify unless:**
- You need to add new dependencies
- You want to change project metadata

---

### 📄 `send-emails-env.js`
**Alternative script using environment variables (more secure)**

Same as `send-emails.js` but loads config from `.env` file instead of hardcoded values.

**When to use:**
- You want better security (credentials in .env)
- You're deploying to production
- You plan to use version control (don't commit credentials)

**How to use:**
1. Install dotenv: `npm install dotenv`
2. Create `.env` file (copy from `.env.example`)
3. Run: `node send-emails-env.js`

---

## Helper Script

### 🔧 `create-sample-excel.js`
**Auto-generates sample Excel file**

Creates `Compan HR contact.xlsx` with sample HR contacts.

**Commands:**
```bash
node create-sample-excel.js
```

**Output:**
- Generates Excel file with 5 sample contacts
- Shows sample data in console
- Ready to edit with your real data

**When to use:**
- First time setup
- Don't have an Excel file yet
- Want to see sample format

---

## Configuration Files

### ⚙️ `.env.example`
**Template for environment variables**

Shows all environment variables you can use:
```
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
APPLICANT_NAME=Your Name
JOB_POSITION=Your Job Title
EMAIL_DELAY=5000
```

**How to use:**
1. Copy to `.env`
2. Fill in your actual values
3. Don't commit `.env` to git (it's in `.gitignore`)

---

### `.gitignore`
**Tells Git which files to ignore**

Prevents accidentally committing:
- `node_modules/` - Dependencies
- `.env` - Sensitive credentials
- `*.log` - Log files
- IDE files (`.vscode/`, `.idea/`)

**Don't modify** unless you know what you're doing.

---

## Documentation Files

### 📖 `README.md` ⭐ **MAIN DOCUMENTATION**
**Complete project documentation**

Contains:
- Features overview
- Prerequisites
- Full setup instructions
- Configuration guide
- Email template
- Customization examples
- Troubleshooting basics
- Security notes

**Read this for:**
- Understanding what the script does
- Detailed setup steps
- How to customize
- Frequently asked questions

---

### 🚀 `QUICK_START.md` ⭐ **FASTEST WAY TO GET STARTED**
**5-minute setup guide**

Quick steps to get running:
1. Install dependencies
2. Create sample Excel file
3. Prepare resume
4. Set up Gmail
5. Run script

**Perfect if you:**
- Want to get started immediately
- Don't have time to read full docs
- Just want step-by-step instructions

---

### 🔍 `TROUBLESHOOTING.md`
**Solutions for common problems**

Covers:
- "Email transporter verification failed"
- "Excel file not found"
- "Resume file not found"
- "Missing required fields"
- Module not found errors
- Email delivery issues
- Debugging tips

**Use when:**
- Script doesn't work
- You get an error message
- Something unexpected happens

**How to use:**
1. Find your error message
2. Read the solution
3. Follow the steps

---

### ⚙️ `CONFIGURATION.md`
**Advanced customization guide**

Shows how to:
- Change personal details
- Modify job position
- Use different email provider
- Customize email template
- Add attachments
- Use environment variables
- Set up different scenarios
- Optimize performance

**Use for:**
- Customizing the script
- Changing email template
- Using different email provider
- Understanding all options

---

## Data Files (You Create These)

### 📊 `Compan HR contact.xlsx`
**Excel file with HR contact details**

Columns:
| Column | Example |
|--------|---------|
| HR_Name | John Doe |
| Company_Name | Tech Inc. |
| Email | john@tech.com |

**How to create:**
- Option 1: Run `node create-sample-excel.js`
- Option 2: Manually create in Excel
- Option 3: Use CSV and convert to Excel

**Must have:**
- Column headers exactly: `HR_Name`, `Company_Name`, `Email`
- No empty rows
- Valid email addresses

---

### 📄 `Kiran_Parmar_Resume.pdf`
**Your resume PDF**

**Requirements:**
- File name must be exactly: `Kiran_Parmar_Resume.pdf`
- Must be in project folder
- Attached to every email automatically

**To customize:**
Edit `send-emails.js`, line 19:
```javascript
resumeFile: "Your_Resume.pdf", // Change filename
```

---

## Project Structure

```
Job Application Emailer/
│
├── 📄 send-emails.js                    ← MAIN SCRIPT (edit this)
├── 📄 send-emails-env.js                ← Alternative (uses .env)
├── 🔧 create-sample-excel.js            ← Helper script
│
├── 📦 package.json                      ← Dependencies
├── ⚙️  .env.example                     ← Config template
├── .gitignore                           ← Git ignore rules
│
├── 📖 README.md                         ← Full documentation
├── 🚀 QUICK_START.md                    ← Quick setup
├── 🔍 TROUBLESHOOTING.md                ← Solutions
├── ⚙️  CONFIGURATION.md                 ← Advanced config
├── 📋 PROJECT_STRUCTURE.md              ← This file
│
├── 📊 Compan HR contact.xlsx            ← Your data (create)
├── 📄 Kiran_Parmar_Resume.pdf           ← Your resume (create)
│
└── node_modules/                        ← Dependencies (auto, don't edit)
    ├── nodemailer/
    └── xlsx/
```

---

## Workflow

### First Time Setup

1. **Read** QUICK_START.md (5 minutes)
2. **Run** `npm install`
3. **Run** `node create-sample-excel.js`
4. **Prepare** your resume PDF
5. **Edit** `send-emails.js` with your details
6. **Run** `npm start`

### Regular Use

```bash
# Prepare data
# 1. Update HR contacts in Excel file

# Run script
npm start

# Check results
# Look for success messages or errors
```

### When Something Goes Wrong

1. **Check** error message carefully
2. **Search** TROUBLESHOOTING.md for that error
3. **Follow** the provided solution
4. **Try** again

### To Customize Script

1. **Read** CONFIGURATION.md
2. **Make** one change at a time
3. **Test** with one email
4. **Verify** it works
5. **Roll out** to all emails

---

## Which File to Edit?

### Just want to run it?
Edit: **`send-emails.js`** (lines 10-24 for CONFIG)

### Want to change template?
Edit: **`send-emails.js`** (function `generateEmailBody` around line 66)

### Want to add security?
Use: **`send-emails-env.js`** with **`.env`** file

### Need sample data?
Run: **`create-sample-excel.js`**

### Have a problem?
Check: **`TROUBLESHOOTING.md`**

### Want to explore options?
Read: **`CONFIGURATION.md`**

---

## File Dependencies

```
send-emails.js
├── Depends on: package.json (has nodemailer, xlsx)
├── Depends on: Compan HR contact.xlsx (data file)
└── Depends on: Kiran_Parmar_Resume.pdf (attachment)

send-emails-env.js
├── Depends on: .env (configuration)
└── Depends on: (same as above)

create-sample-excel.js
└── Creates: Compan HR contact.xlsx
```

---

## File Size Reference

| File | Size | Type |
|------|------|------|
| send-emails.js | ~8 KB | JavaScript |
| send-emails-env.js | ~7 KB | JavaScript |
| create-sample-excel.js | ~2 KB | JavaScript |
| package.json | <1 KB | JSON |
| README.md | ~15 KB | Markdown |
| QUICK_START.md | ~6 KB | Markdown |
| TROUBLESHOOTING.md | ~12 KB | Markdown |
| CONFIGURATION.md | ~14 KB | Markdown |
| .env.example | <1 KB | Text |
| .gitignore | <1 KB | Text |

---

## Next Steps

1. ✅ You now understand all files
2. 📖 Read QUICK_START.md next
3. 🚀 Run `npm install`
4. 🔧 Create sample Excel file
5. ✉️ Run the script!

---

Questions? Check:
- **Setup?** → QUICK_START.md
- **Details?** → README.md
- **Problems?** → TROUBLESHOOTING.md
- **Customize?** → CONFIGURATION.md
