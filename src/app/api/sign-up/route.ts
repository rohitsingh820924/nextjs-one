import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"

import { sendVerifcationEmail } from "@/heplers/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, 
            isVerified: true
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exist"
            },{status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

        if(existingUserByEmail) {
            
            if(existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Username already exist"
                },{status: 400})
            }else{
                const hasedPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        }else {
            const hasedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser =new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingTodo: true,
                todo: []
            })
            await newUser.save()
        }

        // send verification email
        const emailResponse = await sendVerifcationEmail(
            email,
            username,
            verifyCode
        )

        if(emailResponse.success) {
            return Response.json({
                success: false,
                message: "Username already exist"
            },{status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered successfull, please verify your email"
        },{status:201})

    } catch (error) {
        console.error("Error registring user", error);
        return Response.json(
            {
                success: false,
                message: "Error registring user"
            },
            {
                status: 500
            }
        )
    }
}