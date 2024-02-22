import messageModel from "../../../DB/models/message.model.js"
import userModel from "../../../DB/models/user.model.js"

export const testMessage = (req, res, next) => {
    return res.json({ messagge: "message module" })
}
//==>id params and message from body
//==>user exist
//send message
export const sendMessage = async (req, res, next) => {
    const { id } = req.params
    const { message } = req.body
    const user = await userModel.findById({ _id: id })
    if (!user) {
        return next(new Error('user not exist'))
    }
    const newMessage = new messageModel({
        message, recivedId: id
    })
    await newMessage.save()
    await userModel.findByIdAndUpdate({ _id: id },
        { $push: { messages: newMessage._id } })
    return res.json({ messagge: "Done", newMessage })
}

export const deleteMessage = async (req, res, next) => {
    const { _id } = req.user._id
    const { id } = req.params
    const message = await messageModel.findOneAndDelete({ recivedId: _id, _id: id })
    await userModel.findByIdAndUpdate({ _id }, { $pull: { messages: id } })
    return message ? res.json({ message: 'done' }) : next(new Error('invalid id'))
}