import userModel from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../../utils/asyncHandler.js"
export const profile = async (req, res, next) => {
    const user = await userModel.findById({ _id: req.user._id }).populate([
        {
            path: 'messages'
        }
    ])
    return res.json({ messagge: "user module", user })
}

export const shareProfile = async (req, res, next) => {
    const { id } = req.params
    const user = await userModel.findById({ _id: id })
    return res.json({ messagge: "Done", user })
}


export const changePassword = async (req, res, next) => {
    const { _id } = req.user
    const { oldPassword, newPassword } = req.body
    const user = await userModel.findById(_id)
    const match = bcrypt.compareSync(oldPassword, user.password)
    if (!match) {
        return next(new Error('invalid passowrd'))
    }
    const hash = bcrypt.hashSync(newPassword, +process.env.SALT_ROUND)
    user.password = hash
    await user.save()
    return res.json({ messagge: "Done", user })
}

export const uploadProfilImage = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { profileImage: req.file.finalDest }, { new: true })
        return res.json({ messagge: "Done", user })
    }
)

export const uploadCoverImage = asyncHandler(
    async (req, res, next) => {
        const files = req.files
        const images = []
        files.forEach(element => {
            images.push(element.finalDest)
        });

        const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { coverImage: images }, { new: true })
        return res.json({ messagge: "Done", user })
    }
)