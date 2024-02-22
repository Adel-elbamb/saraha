import { Schema, Types, model } from 'mongoose'

//parent child
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'male'
    },
    profileImage: {
        type: String  //one image
    },
    coverImage: {
        type: [String]  //all images
    },
    messages: [
        {
            type: Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: true
})
const userModel = model('User', userSchema)
export default userModel