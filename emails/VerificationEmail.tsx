import * as React from 'react';
import { Html } from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string
}

export function VerificationEmail({username, otp}: VerificationEmailProps) {

  return (
    <Html lang="en">
      <h1>Verification Code</h1>
      <p>{username}, your is <span>{otp}.</span></p>
    </Html>
  );
}

export default VerificationEmail;
