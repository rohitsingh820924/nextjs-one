import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerifcationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username, otp:verifyCode}),
          });
        return {success: true, todos: "Verification email sent successfully"}
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {success: false, todos: "Faield to send verification email"}
    }
}