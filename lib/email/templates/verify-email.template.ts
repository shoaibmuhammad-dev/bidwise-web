// lib/email/templates/verify-email.template.ts
export function verifyEmailTemplate(name: string, verifyUrl: string) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #111;">Hi ${name},</h2>
    <p style="color: #444; font-size: 15px; line-height: 1.5;">
      Thanks for signing up. Please confirm your email address to activate your account.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${verifyUrl}"
         style="background-color: #111; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 15px; display: inline-block;">
        Verify Email
      </a>
    </div>
    <p style="color: #999; font-size: 13px;">
      This link expires in 24 hours. If you didn't create this account, you can ignore this email.
    </p>
  </div>
  `;
}
