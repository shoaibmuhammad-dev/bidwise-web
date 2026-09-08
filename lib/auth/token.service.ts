import jwt from "jsonwebtoken";

const EMAIL_SECRET = process.env.EMAIL_VERIFICATION_SECRET as string;

export function generateEmailVerificationToken(userId: string): string {
  return jwt.sign({ userId, purpose: "email-verification" }, EMAIL_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyEmailVerificationToken(token: string): {
  userId: string;
} {
  const payload = jwt.verify(token, EMAIL_SECRET) as {
    userId: string;
    purpose: string;
  };
  if (payload.purpose !== "email-verification") {
    throw new Error("Invalid token purpose");
  }
  return { userId: payload.userId };
}
