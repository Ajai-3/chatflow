import messageModel from "../models/message.model.js"
import conversationModel from "../models/conversation.model.js"
import asyncHandler from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js"
import { getSocketId, io } from "../socket/socket.js"

//=======================================================================================================================
// SEND MESSAGE CONTROLLER
//=======================================================================================================================
// @DESC    : Handles sending a message from one user to another.
// @ROUTE   : POST /api/v1/send/:receiverId
// @ACCESS  : Private (Authenticated Users Only)
// @USAGE   : Creates a conversation if it doesn't exist and adds message to it.
//=======================================================================================================================
export const sendMessage = asyncHandler(async (req, res, next) => {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const message = req.body.message;

    if (!senderId || !receiverId || !message) {
        return next(new errorHandler("All fields are required", 400));
    }

    let conversation = await conversationModel.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        conversation = await conversationModel.create({
            participants: [senderId, receiverId]
        });
    }

    const newMessage = await messageModel.create({
        senderId,
        receiverId,
        message
    });

    if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    const soketId = getSocketId(receiverId)
    io.to(soketId).emit("newMessage", newMessage)


    return res.status(200).json({
        success: true,
        responseData: {
            newMessage
        }
    });
});

//=======================================================================================================================
// GET MESSAGES CONTROLLER
//=======================================================================================================================
// @DESC    : Retrieves all messages between the logged-in user and a specific receiver.
// @ROUTE   : GET /api/v1/messages/:receiverId
// @ACCESS  : Private (Authenticated Users Only)
// @USAGE   : Fetches the conversation and populates all messages between the two users.
//=======================================================================================================================
export const getMessages = asyncHandler(async (req, res, next) => {
    const myId = req.user._id
    const otherParticipantId = req.params.receiverId;

    if (!myId || !otherParticipantId) {
        return next(new errorHandler("All fields are required", 400))
    }

    let conversation = await conversationModel.findOne({
        participants: { $all: [myId, otherParticipantId] }
    }).populate({
      path: "messages",
    });

    return res.status(200).json({
        success: true,
        responseData: conversation
    })

})
