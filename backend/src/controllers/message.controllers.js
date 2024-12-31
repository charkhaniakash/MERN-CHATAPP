import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json({users: filteredUsers});
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessages =async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            or:[
                {senderId:myId , recieverId:userToChatId},
                {senderId:userToChatId , recieverId:myId}
            ]
        })

        res.status(200).json(messages);


    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const sendMessages=async(req,res)=>{
    try {
        const {id:recieverId} = req.params;
        const senderId = req.user._id;

        const {text,image} = req.body;

        let imageUrl;
        if(imageUrl){
            const upoloadResponse = await cloudinary.uploader.upload(image);
            imageUrl = upoloadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        })

        // implementing socket id (pending TODO)
        await newMessage.save();
        res.status(200).json({message: "Message sent successfully"});



    } catch (error) {
        console.log("Error in sendMessages controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}