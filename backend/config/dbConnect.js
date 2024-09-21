import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect =  () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Issue in DB Connection");
        console.log(error); 
        process.exit(1);       
    }
}
export default dbConnect;