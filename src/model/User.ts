import mongoose, { Document, Schema } from "mongoose";


// Todo Schema

export interface Todo extends Document {
    content: string;
    createdAt: Date
}

const TodoSchema: Schema<Todo> = new Schema ({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

// User Schema


export interface User extends Document {
    usernsme: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingTodo: boolean;
    todo: Todo[]
}

const UserSchema: Schema<User> = new Schema ({
    usernsme: {
        type: String,
        required: [true, "Username is requird"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is requird"],
        unique:true,
        match: [/.+\@.+\..+/, 'please a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is requird"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is requird"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type:Date,
        required: [true, "Verify code Expiry is requird"],
    },
    isAcceptingTodo: {
        type: Boolean,
        default: true
    },
    todo : [TodoSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;