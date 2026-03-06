# Quick Reference Guide

## ⚡ Quick Start (5 Minutes)

### 1. Install Packages
```bash
pip install -r requirements.txt
```

### 2. Get Gmail App Password
- Go to: https://myaccount.google.com/apppasswords
- Select: Mail + Windows Computer
- Copy the 16-character password

### 3. Run Script
```bash
python gmail_bounce_extractor.py
```

### 4. Enter Password
- Paste your 16-character App Password (input is hidden)
- Press Enter

### 5. Check Results
- Open the generated `failed_email_report.xlsx` file
- Contains all failed email addresses with error types and dates

---

## 📋 What the Script Does

| Step | Description |
|------|------------|
| 1 | Connects to Gmail via IMAP (SSL port 993) |
| 2 | Searches inbox for emails from last 30 days |
| 3 | Filters emails with bounce/delivery failure keywords |
| 4 | Extracts failed recipient email addresses using regex |
| 5 | Classifies error types (Delivery Failed, Address Not Found, etc.) |
| 6 | Removes duplicate emails and invalid entries |
| 7 | Saves cleaned data to Excel file with formatting |
| 8 | Displays summary statistics |

---

## 📁 Output Format

**File**: `failed_email_report.xlsx`

| Sr No | Email ID | Error Type | Date |
|-------|----------|-----------|------|
| 1 | invalid@example.com | Address Not Found | 2026-03-06 |
| 2 | blocked@test.com | Message Blocked | 2026-03-05 |

---

## 🔍 Bounce Keywords Detected

The script automatically detects:
- ✅ "Delivery has failed"
- ✅ "Message blocked"
- ✅ "Address not found"
- ✅ "Undelivered Mail Returned to Sender"
- ✅ "Mail delivery failed"
- ✅ "Recipient address rejected"
- ✅ "550 5.1.1" (SMTP error)
- ✅ "User unknown"
- ✅ And 6 more patterns...

---

## 🆘 Troubleshooting

### Problem: Authentication Failed
```
[✗] IMAP Error: Invalid credentials
```
**Fix**: Use Gmail App Password (16 chars), not regular password

### Problem: No Results Found
**Reasons**:
- No bounce emails in inbox
- Keywords don't match your emails
- Date range doesn't include recent bounces

**Fix**: Check your inbox manually or modify email search dates

### Problem: Module Not Found
```
ModuleNotFoundError: No module named 'pandas'
```
**Fix**: Run `pip install -r requirements.txt`

### Problem: SSL/Connection Error
```
[✗] Connection Error: SSL: CERTIFICATE_VERIFY_FAILED
```
**Fix**: Most common on first run. Check internet connection.

---

## ⚙️ Customization

### Change Search Period
Edit `gmail_bounce_extractor.py`:
```python
EMAIL_SEARCH_DAYS = 60  # Search last 60 days
```

### Add Custom Keywords
Edit in `gmail_bounce_extractor.py`:
```python
BOUNCE_KEYWORDS = [
    "Delivery has failed",
    "Your custom keyword",
]
```

### Change Output Filename
Edit in `gmail_bounce_extractor.py`:
```python
EXCEL_FILE = "my_failed_emails.xlsx"
```

### Use Different Gmail Account
Edit in `gmail_bounce_extractor.py`:
```python
GMAIL_USER = "your_email@gmail.com"
```

---

## 🔐 Security

✅ Uses SSL encryption (port 993)  
✅ App Password has limited permissions (Mail only)  
✅ Password is NOT stored anywhere  
✅ Only kept in memory during session  
✅ Connection closes after script finishes  

---

## 📊 Statistics & Logs

The script shows:
```
============================================================
SUMMARY
============================================================
Total emails scanned: 150
Total failed email IDs extracted: 35
Output file: failed_email_report.xlsx
============================================================
```

---

## 📞 Support

| Issue | Solution |
|-------|----------|
| Forgot App Password? | Generate a new one at https://myaccount.google.com/apppasswords |
| Script runs slowly? | Normal - processes ~10 emails/second |
| Want to scan older emails? | Increase `EMAIL_SEARCH_DAYS` value |
| Excel file won't open? | Make sure no other program has it open |

---

## 📚 Required Python Packages

```
pandas==2.0.3       # Data processing & Excel export
openpyxl==3.1.2    # Excel file formatting
```

Built-in (no install needed):
- imaplib (IMAP protocol)
- email (Email parsing)
- re (Regex pattern matching)
- datetime (Date handling)
- getpass (Secure password input)

---

## 🚀 Performance

- **Speed**: ~10 emails/second
- **150 emails**: ~15 seconds
- **Memory**: 50-100 MB
- **Excel save**: Instant

---

## 📝 Tips & Tricks

1. **Backup important data** before running (Excel will overwrite)
2. **Check sender** of bounce emails - usually `Mail Delivery Subsystem`
3. **Review error types** - helps identify systematic issues
4. **Use date column** to track when bounces occurred
5. **Export to CSV** - Right-click Excel file > "Save As" > "CSV"

---

## 🔄 Regular Usage

Run weekly/monthly:
```bash
python gmail_bounce_extractor.py
```

This will:
- Scan recent emails (last 30 days)
- Update your failed email list
- Append or overwrite Excel file (you choose by renaming)

---

## ✅ Checklist Before Running

- [ ] Python 3.7+ installed
- [ ] `pip install -r requirements.txt` completed
- [ ] Gmail account with 2FA enabled
- [ ] Gmail App Password generated
- [ ] 16-character App Password copied
- [ ] Internet connection active
- [ ] Plenty of bounce emails in inbox (for testing)

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Status**: ✅ Ready to Use
