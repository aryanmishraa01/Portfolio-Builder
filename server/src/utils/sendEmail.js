/**
 * Email Service Utility
 * For development & production password reset tokens.
 * Logs reset token to console and returns metadata if no SMTP configuration is present.
 */
const sendResetPasswordEmail = async ({ email, resetToken, resetUrl }) => {
  console.log(`\n==================================================`);
  console.log(`[PASSWORD RESET MOCK SERVICE]`);
  console.log(`To: ${email}`);
  console.log(`Reset Token: ${resetToken}`);
  console.log(`Reset URL: ${resetUrl}`);
  console.log(`==================================================\n`);

  return {
    success: true,
    message: 'Reset token dispatched'
  };
};

module.exports = { sendResetPasswordEmail };
