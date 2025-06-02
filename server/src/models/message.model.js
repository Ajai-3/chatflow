import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: ture
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: ture
    },
    message: {
        type: String,
        require: ture
    }
}, { timestamps: true })

const messageModel = mongoose.model("message", messageSchema)

export default messageModel;