# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Email transporter verification failed"

**Error Message:**
```
✗ Email transporter verification failed: Invalid login credentials
```

**Causes:**
- Wrong App Password
- Using regular Gmail password instead of App Password
- Wrong email address

**Solutions:**
1. Verify you're using a **16-character App Password**, not your regular password
2. Generate a new App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Make sure 2-Step Verification is enabled
   - Select "Mail" and "Windows Computer"
   - Copy the exact 16-character password
3. Update `send-emails.js` with the exact password (including spaces)

---

### 2. "Excel file not found"

**Error Message:**
```
✗ Error reading Excel file: Excel file not found: Compan HR contact.xlsx
```

**Solutions:**
1. Create the sample file:
   ```bash
   node create-sample-excel.js
   ```

2. Or manually create the Excel file:
   - Open Excel
   - Create columns: `HR_Name`, `Company_Name`, `Email`
   - Add your HR contact data
   - Save as `Compan HR contact.xlsx` in the same folder as send-emails.js

3. Verify file location:
   ```bash
   # On Windows PowerShell:
   Get-Item "Compan HR contact.xlsx"
   ```

---

### 3. "Resume file not found"

**Error Message:**
```
✗ Error sending email to john@example.com:
  Error: Resume file not found: Kiran_Parmar_Resume.pdf
```

**Solutions:**
1. Rename your resume PDF to exactly: `Kiran_Parmar_Resume.pdf`
2. Place it in the same folder as `send-emails.js`
3. Verify the file exists:
   ```bash
   # On Windows PowerShell:
   Get-Item "Kiran_Parmar_Resume.pdf"
   ```

---

### 4. "Missing required fields"

**Error Message:**
```
✗ Skipping row 1: Missing required fields
  HR_Name: undefined, Email: undefined, Company: undefined
```

**Causes:**
- Column names in Excel don't match exactly
- Excel columns are named: `HR Name` instead of `HR_Name` (missing underscore)
- Empty rows in Excel file
- Extra spaces in column names

**Solutions:**
1. **Check column headers** - They must be EXACTLY:
   - `HR_Name` (with underscore, not space)
   - `Company_Name` (with underscore, not space)
   - `Email`

2. Remove any empty rows from Excel

3. Re-create the file:
   ```bash
   node create-sample-excel.js
   ```
   Then edit it with your data

4. Verify in Excel:
   - Click on cell A1 (first header)
   - Check it says exactly `HR_Name`
   - Check B1 says exactly `Company_Name`
   - Check C1 says exactly `Email`

---

### 5. "Cannot find module 'nodemailer'"

**Error Message:**
```
Error: Cannot find module 'nodemailer'
```

**Solution:**
Install dependencies:
```bash
npm install
```

---

### 6. "Cannot find module 'xlsx'"

**Error Message:**
```
Error: Cannot find module 'xlsx'
```

**Solution:**
Install dependencies:
```bash
npm install
```

---

### 7. Email sending fails but no specific error

**Symptoms:**
- Script runs but shows "✗ Error sending email"
- No specific error message

**Solutions:**
1. Check internet connection:
   ```bash
   ping google.com
   ```

2. Check Gmail password again (verify 16 characters including spaces)

3. Check if other apps can access Gmail
   - Open Gmail in browser
   - Try logging in

4. Regenerate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Delete the old one
   - Create a new App Password
   - Update script

---

### 8. Emails sent but HR doesn't receive them

**Possible causes:**
- Emails going to spam folder
- Typo in email addresses in Excel
- Gmail blocking mass emails

**Solutions:**
1. Check Gmail spam folder in browser
2. Reduce email delay (might help with spam filters):
   ```javascript
   emailDelay: 10000, // 10 seconds
   ```
3. Verify email addresses in Excel are correct

---

### 9. "ENOTFOUND: getaddrinfo gmail.com"

**Error Message:**
```
Error: getaddrinfo ENOTFOUND gmail.com
```

**Cause:** No internet connection

**Solution:**
- Check internet connection
- Try again

---

### 10. Script hangs or takes very long

**Symptoms:**
- Script seems stuck
- No output for a long time

**Cause:** Waiting for email server response

**Solution:**
1. Press Ctrl+C to stop the script
2. Check internet connection
3. Try again

---

## Debugging Tips

### Enable Verbose Logging

Add this after line 1 in `send-emails.js`:

```javascript
// Enable debug logging
const debug = true;

// In sendEmail function, add:
if (debug) console.log("Attempting to send to:", hrEmail);
```

### Test Email Address

1. Copy one correct email to Excel
2. Run: `npm start`
3. Check if it works
4. If it works, gradually add more emails

### Check Configuration

Add this at the start of `main()` function:

```javascript
console.log("Configuration:");
console.log(JSON.stringify(CONFIG, null, 2));
```

This shows all settings being used.

---

## Verify Prerequisites

### Node.js Installed?
```bash
node --version
# Should show v14.0.0 or higher
```

### npm Installed?
```bash
npm --version
# Should show 6.0.0 or higher
```

### Gmail 2-Step Verification Enabled?
1. Go to https://myaccount.google.com/security
2. Look for "2-Step Verification" - should say "On"
3. If not, enable it first

### App Password Generated?
1. Go to https://myaccount.google.com/apppasswords
2. You should see a password listed for "Mail" and "Windows"

---

## Still Having Issues?

### Collect Information

Run this before asking for help:
```bash
node --version
npm --version
npm list nodemailer xlsx
```

### Common Questions

**Q: Can I use Yahoo, Outlook, or other email?**  
A: Yes! Change the `service: "gmail"` to your provider:
```javascript
service: "outlook" // for Outlook
service: "yahoo"   // for Yahoo
```

**Q: Can I test with one email first?**  
A: Yes! Create Excel with just one contact and test.

**Q: Can I modify the email body?**  
A: Yes! Edit the `generateEmailBody()` function in send-emails.js

**Q: Can I send from a different email?**  
A: Yes! Update `senderEmail` in CONFIG section

**Q: How do I know if email was delivered?**  
A: Check the recipient's inbox or Gmail sent folder

---

## Still Need Help?

1. Read the README.md for more details
2. Check QUICK_START.md for basic setup
3. Review your error message carefully
4. Follow the solution for that specific error
5. Verify all prerequisite steps are complete
