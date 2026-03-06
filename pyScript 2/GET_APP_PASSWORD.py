"""
Gmail App Password Generator Helper
Step-by-step guide to get the correct password
"""

print("="*70)
print("GMAIL APP PASSWORD SETUP - STEP BY STEP")
print("="*70)

print("""
There's a difference between:
  ❌ Gmail Login Password (what you use to login at gmail.com)
  ✅ App Password (16-character code for scripts/apps)

The script needs the APP PASSWORD, not your Gmail password.

STEP 1: Enable 2-Step Verification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification"
3. It should show "2-Step Verification is ON" (green checkmark)
4. If OFF, click it and enable it
5. Wait 5 minutes after enabling

STEP 2: Generate App Password
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Go to: https://myaccount.google.com/apppasswords
2. You MUST see a dropdown menu (if not, 2FA is not enabled)
3. First dropdown: Select "Mail"
4. Second dropdown: Select "Windows Computer"
5. Click "Generate"
6. Google will show a 16-character password

STEP 3: Copy the Password
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Google shows something like:
  "abcd efgh ijkl mnop"

Copy the password (remove spaces if you want):
  ✓ abcdefghijklmnop (16 characters, no spaces)
  
DO NOT copy:
  ❌ Your Gmail login password
  ❌ The full URL or text shown on screen
  ❌ Incomplete password (less than 16 chars)

STEP 4: Update the Script
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Edit gmail_bounce_extractor.py and find this line:
  GMAIL_PASSWORD = "Kp93630007@"

Replace with your 16-character App Password:
  GMAIL_PASSWORD = "abcdefghijklmnop"

STEP 5: Run the Script
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
powershell
cd "d:\Resume\Resume-Create\pyScript 2"
c:/python313/python.exe gmail_bounce_extractor.py

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  IMPORTANT SECURITY NOTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ App Password only works for Mail (limited permissions)
✓ You can delete/regenerate App Passwords anytime
✓ After script testing, regenerate a NEW App Password
✓ Better: Set USE_HARDCODED_PASSWORD = False to prompt each time

⚠️  DO NOT:
  ❌ Share this password with anyone
  ❌ Use the same password for other devices
  ❌ Commit this to GitHub with password in it!
  ❌ Keep this password in the script long-term

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready?

1. Go to: https://myaccount.google.com/apppasswords
2. Generate a NEW App Password
3. Copy the 16-character code
4. Update gmail_bounce_extractor.py with that code
5. Run the script
""")

print("="*70)
print("EXAMPLE of correct App Password format:")
print("  GMAIL_PASSWORD = \"abcdefghijklmnop\"  (16 characters)")
print("="*70)
