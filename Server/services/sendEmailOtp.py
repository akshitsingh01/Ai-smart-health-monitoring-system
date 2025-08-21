import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailSender:
    def __init__(self, sender_email, sender_password):
        self.sender_email = sender_email
        self.sender_password = sender_password

    def send_welcome_email(self, receiver_email: str, name: str, otp: int):
        try:
            # Email subject and body
            subject = "Welcome to Our Service!"
            message = f"Hello {name},\n\nWelcome to our service! Your OTP is: {otp}\n\nThank you for joining us."

            # Set up the MIME
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = receiver_email
            msg['Subject'] = subject
            msg.attach(MIMEText(message, 'plain'))

            # Establish a connection to the Gmail SMTP server
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()  # Enable security (TLS)
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
                print("✅ Welcome email sent successfully!")

        except Exception as e:
            print(f"❌ Failed to send email: {e}")

# # Usage
# sender_email = "your_email@gmail.com"
# sender_password = "your_password"
#
# # Instantiate the email sender
# email_sender = EmailSender(sender_email, sender_password)
#
# # Send a welcome email with recipient's name and OTP

