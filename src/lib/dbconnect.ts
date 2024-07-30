import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connction: ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if(connction.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {} )

        connction.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("Database connection faield",error)
        process.exit(1)
    }
}

export default dbConnect;