"""
Setup Helper Script for Gmail Bounce Extractor
This script helps with initial setup and verification
"""

import sys
import subprocess
import os


def check_python_version():
    """Check if Python version is 3.7+"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 7):
        print(f"❌ Python {version.major}.{version.minor} detected. Python 3.7+ required.")
        return False
    print(f"✅ Python {version.major}.{version.minor} OK")
    return True


def install_requirements():
    """Install required packages"""
    print("\n[*] Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Packages installed successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to install packages: {e}")
        print("    Try running: pip install -r requirements.txt")
        return False


def verify_packages():
    """Verify all required packages are installed"""
    print("\n[*] Verifying packages...")
    required_packages = ['pandas', 'openpyxl']
    missing = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"  ✅ {package}")
        except ImportError:
            print(f"  ❌ {package}")
            missing.append(package)
    
    if missing:
        print(f"\n❌ Missing packages: {', '.join(missing)}")
        return False
    
    print("✅ All packages verified")
    return True


def show_gmail_setup_guide():
    """Display Gmail App Password setup guide"""
    print("\n" + "="*60)
    print("GMAIL APP PASSWORD SETUP GUIDE")
    print("="*60)
    print("""
The script requires a Gmail App Password (16 characters).

Steps to generate:
1. Go to https://myaccount.google.com/security
2. Ensure 2-Step Verification is ENABLED
3. Click "App passwords" at the bottom
4. Select: Mail + Windows Computer
5. Click Generate
6. Copy the 16-character password (without spaces)
7. Enter it when the script asks

⚠️  Use the App Password, NOT your regular Gmail password!
⚠️  The script will prompt you for it - it's not stored anywhere
""")
    print("="*60)


def show_next_steps():
    """Display next steps"""
    print("\n" + "="*60)
    print("SETUP COMPLETE - NEXT STEPS")
    print("="*60)
    print("""
To run the Gmail Bounce Extractor:

1. Make sure you have your Gmail App Password ready
   (Get it from: https://myaccount.google.com/apppasswords)

2. Run the main script:
   python gmail_bounce_extractor.py

3. Enter your 16-character App Password when prompted

4. Wait for the script to scan your emails

5. Check the generated file:
   failed_email_report.xlsx

For more info, see README.md
""")
    print("="*60)


def main():
    """Run setup verification"""
    print("="*60)
    print("Gmail Bounce Extractor - Setup Verification")
    print("="*60 + "\n")
    
    # Check Python version
    if not check_python_version():
        print("❌ Setup verification failed")
        sys.exit(1)
    
    # Install packages
    if not install_requirements():
        print("⚠️  Warning: Package installation failed, but continuing...")
    
    # Verify packages
    if not verify_packages():
        print("❌ Setup verification failed")
        print("Run: pip install -r requirements.txt")
        sys.exit(1)
    
    # Show Gmail setup guide
    show_gmail_setup_guide()
    
    # Show next steps
    show_next_steps()
    
    print("\n✅ Setup verification complete! Ready to use.")


if __name__ == "__main__":
    main()
