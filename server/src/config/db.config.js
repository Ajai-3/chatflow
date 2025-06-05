import mongoose from "mongoose"

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL)
      if (process.env.NODE_ENV !== 'production') {
         console.log("Database connected successfully")
      }
   } catch (error) {
      console.error("Error connecting to database:", error.message)
      process.exit(1)
   }
}

export default connectDB;