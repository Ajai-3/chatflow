import mongoose from "mongoose"

const connectDB = async () => {
     try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Data base is connected.")
     } catch (error) {
        console.log("Error  connecting with database") 
       process.exist(1)
     }
}

export default connectDB;