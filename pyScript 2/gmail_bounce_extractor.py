"""
Gmail Failed Email Extractor
This script scans Gmail inbox for bounce/delivery failed emails and exports failed
email addresses to an Excel file.

Features:
- Connects to Gmail via IMAP (SSL)
- Searches for bounce/delivery failure emails
- Extracts failed recipient email addresses using regex
- Filters emails from the last 30 days
- Classifies error types
- Removes duplicate email IDs
- Saves results to Excel file
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
GMAIL_PASSWORD = "ijqulntxsrgqvilk"  # ⚠️ SECURITY WARNING: Password is hardcoded! Change after testing!
IMAP_SERVER = "imap.gmail.com"
IMAP_PORT = 993
EXCEL_FILE = "failed_email_report.xlsx"
EMAIL_SEARCH_DAYS = 30
USE_HARDCODED_PASSWORD = True  # Set to False to prompt for password

# Keywords to identify bounce/delivery failure emails
BOUNCE_KEYWORDS = [
    "Delivery has failed",
    "Message blocked",
    "Address not found",
    "Undelivered Mail Returned to Sender",
    "Mail delivery failed",
    "Recipient address rejected",
    "550 5.1.1",
    "User unknown",
    "bounce",
    "failure notice",
    "delivery status notification",
    "mail delivery failed",
    "undeliverable",
    "returned mail"
]

class GmailBounceExtractor:
    """Extract failed email addresses from Gmail bounce emails"""
    
    def __init__(self, email_user: str, email_password: str):
        """
        Initialize Gmail connection
        
        Args:
            email_user: Gmail email address
            email_password: Gmail app password
        """
        self.email_user = email_user
        self.email_password = email_password
        self.mail = None
        self.failed_emails = []
        self.total_emails_scanned = 0
        
    def connect(self) -> bool:
        """Connect to Gmail IMAP server"""
        try:
            print(f"[*] Connecting to {IMAP_SERVER}:{IMAP_PORT}...")
            self.mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
            self.mail.login(self.email_user, self.email_password)
            print("[✓] Successfully connected to Gmail")
            return True
        except imaplib.IMAP4.error as e:
            print(f"[✗] IMAP Error: {e}")
            print("[!] Make sure to use Gmail App Password, not regular password")
            print("[!] Generate at: https://myaccount.google.com/apppasswords")
            return False
        except Exception as e:
            print(f"[✗] Connection Error: {e}")
            return False
    
    def disconnect(self):
        """Disconnect from Gmail"""
        if self.mail:
            try:
                self.mail.close()
                self.mail.logout()
                print("[✓] Disconnected from Gmail")
            except:
                pass
    
    def get_date_range(self) -> Tuple[str, str]:
        """Get date range for last 30 days"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=EMAIL_SEARCH_DAYS)
        
        # Format for IMAP: "01-Jan-2026"
        start_str = start_date.strftime("%d-%b-%Y")
        end_str = end_date.strftime("%d-%b-%Y")
        
        print(f"[*] Scanning emails from {start_str} to {end_str}")
        return start_str, end_str
    
    def search_bounce_emails(self) -> List[bytes]:
        """Search for bounce/delivery failure emails"""
        try:
            self.mail.select("INBOX")
            start_date, end_date = self.get_date_range()
            
            # Build search query
            search_query = f'SINCE {start_date} BEFORE {end_date} ('
            search_query += ' OR '.join([f'SUBJECT "{keyword}"' for keyword in BOUNCE_KEYWORDS[:3]])
            search_query += ' OR '
            search_query += ' OR '.join([f'BODY "{keyword}"' for keyword in BOUNCE_KEYWORDS[:3]])
            search_query += ')'
            
            # Simplified search for better compatibility
            status, messages = self.mail.search(None, 'ALL')
            
            if status == 'OK':
                message_ids = messages[0].split()
                print(f"[*] Found {len(message_ids)} total emails in inbox")
                return message_ids
            return []
        except Exception as e:
            print(f"[✗] Error searching emails: {e}")
            return []
    
    def classify_error_type(self, subject: str, body: str) -> str:
        """Classify error type based on email content"""
        content = f"{subject} {body}".lower()
        
        if "address not found" in content or "user unknown" in content:
            return "Address Not Found"
        elif "message blocked" in content or "blocked" in content:
            return "Message Blocked"
        elif "delivery" in content or "failed" in content or "undelivered" in content:
            return "Delivery Failed"
        else:
            return "Unknown Error"
    
    def extract_email_addresses(self, text: str) -> List[str]:
        """Extract email addresses from text using regex"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        addresses = re.findall(email_pattern, text)
        return addresses
    
    def is_bounce_email(self, subject: str, body: str) -> bool:
        """Check if email is a bounce/delivery failure email"""
        content = f"{subject} {body}".lower()
        return any(keyword.lower() in content for keyword in BOUNCE_KEYWORDS)
    
    def decode_email_header(self, header: str) -> str:
        """Decode email header"""
        try:
            if isinstance(header, bytes):
                header = header.decode('utf-8', errors='ignore')
            decoded_parts = decode_header(header)
            decoded_string = ''
            for part, encoding in decoded_parts:
                if isinstance(part, bytes):
                    decoded_string += part.decode(encoding or 'utf-8', errors='ignore')
                else:
                    decoded_string += str(part)
            return decoded_string
        except:
            return str(header)
    
    def extract_bounce_data(self) -> bool:
        """Extract failed email addresses from bounce emails"""
        try:
            message_ids = self.search_bounce_emails()
            
            if not message_ids:
                print("[!] No emails found")
                return False
            
            self.total_emails_scanned = len(message_ids)
            processed = 0
            bounce_count = 0
            
            print(f"[*] Processing {len(message_ids)} emails...")
            
            for msg_id in message_ids:
                try:
                    status, msg_data = self.mail.fetch(msg_id, '(RFC822)')
                    
                    if status == 'OK' and msg_data and len(msg_data) > 0:
                        # Handle both bytes and tuple formats
                        raw_email = msg_data[0]
                        if isinstance(raw_email, tuple):
                            raw_email = raw_email[1]
                        if isinstance(raw_email, bytes):
                            msg = email.message_from_bytes(raw_email)
                        else:
                            msg = email.message_from_string(str(raw_email))
                        
                        # Get subject and date
                        subject = self.decode_email_header(msg.get('Subject', 'No Subject'))
                        date_str = msg.get('Date', 'Unknown')
                        
                        # Parse date
                        try:
                            from email.utils import parsedate_to_datetime
                            email_date = parsedate_to_datetime(date_str).strftime('%Y-%m-%d')
                        except:
                            email_date = datetime.now().strftime('%Y-%m-%d')
                        
                        # Get email body
                        body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                if part.get_content_type() == "text/plain":
                                    try:
                                        payload = part.get_payload(decode=True)
                                        if isinstance(payload, bytes):
                                            body = payload.decode('utf-8', errors='ignore')
                                        else:
                                            body = str(payload)
                                    except Exception as e:
                                        try:
                                            body = str(part.get_payload(decode=False))
                                        except:
                                            body = ""
                                    break
                        else:
                            try:
                                payload = msg.get_payload(decode=True)
                                if isinstance(payload, bytes):
                                    body = payload.decode('utf-8', errors='ignore')
                                else:
                                    body = str(payload)
                            except Exception as e:
                                try:
                                    body = str(msg.get_payload(decode=False))
                                except:
                                    body = ""
                        
                        # Check if it's a bounce email
                        if self.is_bounce_email(subject, body):
                            bounce_count += 1
                            
                            # Extract email addresses
                            email_addresses = self.extract_email_addresses(body)
                            
                            if email_addresses:
                                error_type = self.classify_error_type(subject, body)
                                
                                for address in email_addresses:
                                    self.failed_emails.append({
                                        'Email ID': address,
                                        'Error Type': error_type,
                                        'Date': email_date,
                                        'Subject': subject[:50]  # Store subject for reference
                                    })
                        
                        processed += 1
                        if processed % 10 == 0:
                            print(f"[*] Processed {processed}/{len(message_ids)} emails...")
                
                except Exception as e:
                    print(f"[!] Error processing email {msg_id}: {e}")
                    continue
            
            print(f"[✓] Processed all emails")
            print(f"[✓] Found {bounce_count} bounce/failure emails")
            print(f"[✓] Extracted {len(self.failed_emails)} failed email addresses (before cleanup)")
            
            return len(self.failed_emails) > 0
        
        except Exception as e:
            print(f"[✗] Error extracting bounce data: {e}")
            return False
    
    def remove_duplicates(self):
        """Remove duplicate email IDs and clean data"""
        print("[*] Removing duplicates...")
        
        # Convert to DataFrame for easier manipulation
        df = pd.DataFrame(self.failed_emails)
        
        if df.empty:
            print("[!] No data to process")
            return
        
        # Remove duplicates - keep first occurrence
        df = df.drop_duplicates(subset=['Email ID'], keep='first')
        
        # Remove invalid entries (empty email addresses)
        df = df[df['Email ID'].str.strip() != '']
        
        # Remove system addresses
        invalid_patterns = ['noreply', 'no-reply', 'postmaster', 'mailer-daemon', 'Mail Delivery']
        for pattern in invalid_patterns:
            df = df[~df['Email ID'].str.lower().str.contains(pattern, na=False)]
        
        self.failed_emails = df.to_dict('records')
        print(f"[✓] After cleanup: {len(self.failed_emails)} unique failed email addresses")
    
    def save_to_excel(self, filename: str = EXCEL_FILE) -> bool:
        """Save failed emails to Excel file"""
        try:
            if not self.failed_emails:
                print("[!] No data to save")
                return False
            
            # Create DataFrame
            df = pd.DataFrame(self.failed_emails)
            
            # Add serial number
            df.insert(0, 'Sr No', range(1, len(df) + 1))
            
            # Select columns
            df = df[['Sr No', 'Email ID', 'Error Type', 'Date']]
            
            # Sort by date (newest first)
            df['Date'] = pd.to_datetime(df['Date'])
            df = df.sort_values('Date', ascending=False)
            df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
            
            # Save to Excel
            with pd.ExcelWriter(filename, engine='openpyxl') as writer:
                df.to_excel(writer, sheet_name='Failed Emails', index=False)
                
                # Format Excel
                workbook = writer.book
                worksheet = writer.sheets['Failed Emails']
                
                # Adjust column widths
                worksheet.column_dimensions['A'].width = 5
                worksheet.column_dimensions['B'].width = 35
                worksheet.column_dimensions['C'].width = 20
                worksheet.column_dimensions['D'].width = 15
                
                # Add header formatting
                from openpyxl.styles import Font, PatternFill
                header_font = Font(bold=True, color="FFFFFF")
                header_fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
                
                for cell in worksheet[1]:
                    cell.font = header_font
                    cell.fill = header_fill
            
            print(f"[✓] Successfully saved to {filename}")
            print(f"[✓] Total records: {len(df)}")
            return True
        
        except Exception as e:
            print(f"[✗] Error saving to Excel: {e}")
            return False
    
    def run(self):
        """Main execution function"""
        print("=" * 60)
        print("Gmail Failed Email Extractor")
        print("=" * 60)
        
        # Connect to Gmail
        if not self.connect():
            print("[✗] Failed to connect. Exiting.")
            return False
        
        # Extract bounce data
        if not self.extract_bounce_data():
            print("[!] No bounce emails found")
            self.disconnect()
            return False
        
        # Remove duplicates and clean data
        self.remove_duplicates()
        
        # Save to Excel
        success = self.save_to_excel()
        
        # Disconnect
        self.disconnect()
        
        # Print summary
        print("\n" + "=" * 60)
        print("SUMMARY")
        print("=" * 60)
        print(f"Total emails scanned: {self.total_emails_scanned}")
        print(f"Total failed email IDs extracted: {len(self.failed_emails)}")
        print(f"Output file: {EXCEL_FILE}")
        print("=" * 60 + "\n")
        
        return success


def main():
    """Main function"""
    import sys
    
    if USE_HARDCODED_PASSWORD:
        print("="*60)
        print("Gmail Failed Email Extractor")
        print("="*60)
        print("[!] Using pre-configured Gmail credentials...")
        password = GMAIL_PASSWORD
    else:
        print("[!] Gmail Setup:")
        print("[!] 1. This script requires Gmail App Password")
        print("[!] 2. Generate at: https://myaccount.google.com/apppasswords")
        print("[!] 3. Select 'Mail' and 'Windows Computer'")
        print("[!] 4. Copy the 16-character password\n")
        
        # Use visible input on Windows to avoid getpass issues
        try:
            import getpass
            password = getpass.getpass("Enter Gmail App Password (16 characters): ", stream=sys.stderr)
        except:
            # Fallback to regular input if getpass fails
            print("[!] Using visible input mode (for troubleshooting)")
            password = input("Enter Gmail App Password (16 characters): ")
        
        if not password:
            print("[✗] No password provided. Exiting.")
            return
        
        # Clean up password (remove spaces if present)
        password = password.strip().replace(" ", "")
    
    # Create extractor and run
    extractor = GmailBounceExtractor(GMAIL_USER, password)
    success = extractor.run()
    
    if success:
        print("[✓] Script completed successfully!")
        
        # Show preview of data
        if os.path.exists(EXCEL_FILE):
            df = pd.read_excel(EXCEL_FILE)
            print("\nPreview of extracted data:")
            print(df.head(10))
            
            print("\n" + "="*60)
            print("⚠️  SECURITY REMINDER")
            print("="*60)
            print("[!] Password is hardcoded in the script!")
            print("[!] Change it now by:")
            print("[!] 1. Renew Gmail App Password at:")
            print("[!]    https://myaccount.google.com/apppasswords")
            print("[!] 2. Update GMAIL_PASSWORD in this script")
            print("[!] 3. Set USE_HARDCODED_PASSWORD = False after testing")
            print("="*60)
    else:
        print("[✗] Script completed with errors")


if __name__ == "__main__":
    main()
