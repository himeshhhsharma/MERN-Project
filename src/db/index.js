import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME, // Use dbName option instead of appending in the URI
        });
        console.log(`MongoDB Connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Mongoose Connection FAILED:", error);
        process.exit(1);
    }
};

export default connectDB;
