"""
Gmail Failed Email Extractor - DEBUG VERSION
Debug version to troubleshoot connection issues
"""

import imaplib
import email
from email.header import decode_header
import re
import pandas as pd
from datetime import datetime, timedelta
import os
from typing import List, Dict, Tuple

# Configuration
GMAIL_USER = "parmarkiran1115@gmail.com"
IMAP_SERVER = "imap.gmail.com"
IMAP_PORT = 993

def test_connection(password):
    """Test Gmail IMAP connection with debug output"""
    print("\n" + "="*60)
    print("DEBUG: Testing Gmail Connection")
    print("="*60)
    
    print(f"\n[DEBUG] Email: {GMAIL_USER}")
    print(f"[DEBUG] Password length: {len(password)} characters")
    print(f"[DEBUG] Password (first 3 chars): {password[:3]}***")
    print(f"[DEBUG] Server: {IMAP_SERVER}:{IMAP_PORT}")
    
    try:
        print("\n[*] Attempting IMAP connection...")
        mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT, timeout=10)
        print("[✓] SSL connection established")
        
        print(f"\n[*] Attempting login as {GMAIL_USER}...")
        mail.login(GMAIL_USER, password)
        print("[✓] Authentication successful!")
        
        # Check mailbox
        print("\n[*] Checking mailbox...")
        status, mailbox_list = mail.list()
        print(f"[✓] Mailbox access OK: {status}")
        
        # Select inbox
        status, msg_count = mail.select("INBOX")
        if status == 'OK':
            print(f"[✓] INBOX selected - {msg_count[0].decode()} emails found")
        
        mail.close()
        mail.logout()
        print("\n[✓] Connection test PASSED!")
        return True
        
    except imaplib.IMAP4.error as e:
        print(f"\n[✗] IMAP Error: {e}")
        print("\n📋 TROUBLESHOOTING STEPS:")
        print("1. Go to: https://myaccount.google.com/security")
        print("2. Check if 2-Step Verification is ENABLED")
        print("3. Go to: https://myaccount.google.com/apppasswords")
        print("4. Select 'Mail' and 'Windows Computer'")
        print("5. Make sure you're using the 16-char PASSWORD, not email password")
        print("6. Try generating a NEW App Password")
        return False
    except Exception as e:
        print(f"\n[✗] Connection Error: {e}")
        print(f"[DEBUG] Error type: {type(e).__name__}")
        return False


def main():
    """Main debug function"""
    print("="*60)
    print("Gmail Bounce Extractor - DEBUG MODE")
    print("="*60)
    
    print("\n⚠️  DEBUG MODE - For troubleshooting only")
    print("\nIMPORTANT:")
    print("- Use ONLY the 16-character App Password")
    print("- NOT your regular Gmail password")
    print("- NOT your email address")
    
    print("\nYour Gmail Account: parmarkiran1115@gmail.com")
    print("\nTo generate App Password:")
    print("1. Go to: https://myaccount.google.com/apppasswords")
    print("2. Make sure 2-Step Verification is enabled first")
    print("3. Select: Mail + Windows Computer")
    print("4. Google will give you a 16-character password")
    
    print("\n" + "-"*60)
    password = input("Enter App Password (will be shown in debug output): ")
    
    if not password:
        print("❌ No password entered")
        return
    
    print(f"\n[DEBUG] You entered: {len(password)} characters")
    print(f"[DEBUG] First 3 chars: {password[:3]}")
    print(f"[DEBUG] Last 3 chars: {password[-3:]}")
    
    # Check for common issues
    print("\n" + "="*60)
    print("PRE-CHECK VALIDATION")
    print("="*60)
    
    if len(password) != 16:
        print(f"⚠️  WARNING: App Password should be 16 characters, got {len(password)}")
        print("   Gmail App Passwords are generated as: 'xxxx xxxx xxxx xxxx'")
        print("   Remove spaces if present")
    
    if password.count(' ') > 0:
        print("⚠️  WARNING: Password contains spaces!")
        print("   Removing spaces...")
        password = password.replace(' ', '')
        print(f"   New password: {password[:3]}***{password[-3:]} ({len(password)} chars)")
    
    if '@' in password:
        print("⚠️  ERROR: Password contains @ symbol")
        print("   This looks like an email address, not an App Password!")
        print("   Please use the 16-character App Password instead")
        return
    
    # Test connection
    success = test_connection(password)
    
    if success:
        print("\n✅ SUCCESS! Your credentials work.")
        print("You can now run: python.exe gmail_bounce_extractor.py")
    else:
        print("\n❌ FAILED: Connection unsuccessful")
        print("\nNext steps:")
        print("1. Double-check your 16-character App Password")
        print("2. Make sure 2-Step Verification is enabled in Gmail")
        print("3. Generate a NEW App Password from:")
        print("   https://myaccount.google.com/apppasswords")
        print("4. Try again")


if __name__ == "__main__":
    main()
