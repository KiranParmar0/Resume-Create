# Gmail Authentication Troubleshooting

## Error: "Invalid credentials (Failure)"

This means the password you're entering is NOT correct. Here's how to fix it:

### ✅ Step 1: Verify 2-Step Verification is Enabled

1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification"
3. It should show "2-Step Verification is on" (in green)
4. **If it says OFF or SETUP**: Click it and enable it first
5. After enabling, wait 5 minutes before generating App Password

### ✅ Step 2: Generate a NEW App Password

⚠️ **Important**: Only enable this AFTER 2-Step Verification is ON

1. Go to: https://myaccount.google.com/apppasswords
2. You should see a dropdown menu saying "Select the app and device you're using this app password for"
3. **Select "Mail"** from first dropdown
4. **Select "Windows Computer"** from second dropdown
5. Click **Generate**
6. Google will show a **16-character password** (format: `xxxx xxxx xxxx xxxx`)
7. **Copy this password** (it appears only once)

### ✅ Step 3: Prepare the Password Correctly

The password Google generates looks like:
```
acba cxyz abcd efgh
```

Remove spaces before using:
```
abcacxyzabcdefgh
```

### ✅ Step 4: Test with Debug Script

Run the debug version to verify:

```powershell
c:/python313/python.exe gmail_bounce_extractor_debug.py
```

This will:
- Show you what you entered
- Check for common mistakes (spaces, wrong format)
- Test the actual connection
- Give you detailed error messages

### ✅ Step 5: Run Main Script

Once debug test passes:

```powershell
c:/python313/python.exe gmail_bounce_extractor.py
```

---

## Common Mistakes

### ❌ Using Regular Gmail Password
**Wrong**: Your Gmail password that you use to login to Gmail.com
**Right**: The 16-character App Password from apppasswords page

### ❌ Password Has Spaces
**Wrong**: `abca cxyz abcd efgh` (with spaces)
**Right**: `abcacxyzabcdefgh` (no spaces)

### ❌ 2-Step Verification Not Enabled
**Problem**: App Passwords only work if 2-Step Verification is ON
**Solution**: Go to https://myaccount.google.com/security and enable it

### ❌ Using Email Address as Password
**Wrong**: `parmarkiran1115@gmail.com`
**Right**: The 16-character code from App Passwords page

### ❌ Copying Incomplete Password
**Wrong**: Only copied first 8 characters
**Right**: Copy the entire 16-character password

---

## Step-by-Step Checklist

- [ ] 2-Step Verification is **ON** at: https://myaccount.google.com/security
- [ ] App Password generated at: https://myaccount.google.com/apppasswords
- [ ] Selected "Mail" app
- [ ] Selected "Windows Computer"
- [ ] Got 16-character password (format: xxxx xxxx xxxx xxxx)
- [ ] Copied the ENTIRE password
- [ ] Removed spaces from password
- [ ] Password is NOT your Gmail login password
- [ ] Password is NOT your email address
- [ ] Tested with debug script: `python.exe gmail_bounce_extractor_debug.py`

---

## Testing Steps

### Test 1: Verify Password Format
```powershell
# Run this to check password
c:/python313/python.exe
Python 3.13.1
>>> password = "your_16_char_password_here"
>>> len(password)
16
>>> print(password)
your_16_char_password_here
>>> exit()
```

### Test 2: Run Debug Script
```powershell
c:/python313/python.exe gmail_bounce_extractor_debug.py
```

Expected output:
```
✓ SSL connection established
✓ Authentication successful!
✓ INBOX selected - XX emails found
✓ Connection test PASSED!
```

### Test 3: Run Main Script
```powershell
c:/python313/python.exe gmail_bounce_extractor.py
```

---

## If Still Not Working

### Option 1: Delete and Recreate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select the password you created
3. Click the delete button (trash icon)
4. Generate a NEW one
5. Copy the new 16-character password
6. Test again

### Option 2: Try Different Browser
- Logout of Gmail in current browser
- Try generating in Incognito/Private window
- Or use a different browser (Chrome, Edge, Firefox)

### Option 3: Check Gmail Account Status
1. Go to: https://myaccount.google.com/
2. Look for any security warnings
3. If there are suspicious activity alerts, review them
4. Verify your recovery email and phone

### Option 4: Contact Gmail Support
If none of the above work:
- Go to: https://support.google.com/accounts/
- Click "Your Account"
- Click "Security"
- Click "Get Support" / "Contact Support"
- Describe the App Password issue

---

## Security Reminders

✅ **Safe**: Using App Password (limited permissions for Mail only)
✅ **Safe**: App Password expires if not used, you can delete it anytime
✅ **Safe**: You can generate multiple App Passwords for different devices

❌ **NOT Safe**: Sharing your Gmail password
❌ **NOT Safe**: Storing App Password in code files
❌ **NOT Safe**: Using the same password everywhere

---

## Still Having Issues?

Run this to collect debug info:

```powershell
# Test if packages are installed
c:/python313/python.exe -c "import pandas; import openpyxl; print('OK')"

# Check Python version
python --version

# Show your Gmail account
echo "Your email: parmarkiran1115@gmail.com"

# Test network connection to Gmail
Test-NetConnection imap.gmail.com -Port 993
```

If Test-NetConnection shows "TcpTestSucceeded : True", your network is fine.

---

**Still stuck?** Try the debug script first:
```powershell
c:/python313/python.exe gmail_bounce_extractor_debug.py
```

It will show exactly what's wrong and how to fix it.
