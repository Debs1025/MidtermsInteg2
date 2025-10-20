export async function sendVerificationEmail({ toEmail, verificationToken }) {
  // Mock: log link to console. In production, integrate a real email provider.
  const verificationUrl = `${process.env.APP_BASE_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
  console.log(`[EMAIL] To: ${toEmail} | Verify: ${verificationUrl}`);
  return true;
}


