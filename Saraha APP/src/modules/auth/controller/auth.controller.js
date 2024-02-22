import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from "../../../utils/email.js"
import userModel from '../../../DB/models/user.model.js'

export const signUp = async (req, res, next) => {


    const { email, password, name, gender } = req.body

    const emailExist = await userModel.findOne({ email })
    if (emailExist) {
        return next(new Error("email already exist"))
    }
    const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)
    req.body.password = hashPassword
    const newUser = await userModel.create(req.body)
    const token = jwt.sign({ email, _id: newUser._id },
        process.env.CONFIRM_EMAIL_SIGNETURE,
        { expiresIn: 60 * 5 })
    const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`
    const refreshToken = jwt.sign({ email, _id: newUser._id },
        process.env.CONFIRM_EMAIL_SIGNETURE,
        { expiresIn: 60 * 60 * 24 * 30 })
    const refreshLink = `${req.protocol}://${req.headers.host}/user/refreshToken/${refreshToken}`
    sendEmail({
        to: email, subject: 'confirm email', html: `<a href='${link}'>confirm email</a>
    <br>
    <br>
    <a href='${refreshLink}'>send refresh token</a>
    ` })
    return newUser ? res.json({ message: "done", newUser }) : res.json({ messag: "invalid add new user" })

}
export const logIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error('invalid email or password'))
    }

    // if (!user.confirmEmail) {
    //     return next(new Error('please confirm email first'))
    // }
    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return next(new Error('invalid email or password'))
    }
    const token = jwt.sign({ email, _id: user._id }, process.env.TOKEN_SIGNETURE, { expiresIn: 60 * 60 })
    return res.json({ message: "done", token })
}

export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    const payload = jwt.verify(token, process.env.CONFIRM_EMAIL_SIGNETURE)
    const user = await userModel.findByIdAndUpdate({ _id: payload._id }, { confirmEmail: true })
    return res.redirect('http://127.0.0.1:5500/sign-up-login-form/logIn/')
}

export const refreshToken = (req, res, next) => {
    const { token } = req.params
    const payload = jwt.verify(token, process.env.CONFIRM_EMAIL_SIGNETURE)
    console.log(payload);
    const newToken = jwt.sign({ email: payload.email, _id: payload._id },
        process.env.CONFIRM_EMAIL_SIGNETURE,
        { expiresIn: 60 * 2 })
    const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${newToken}`

    sendEmail({
        to: payload.email, subject: 'confirm email', html: `<a href='${link}'>confirm email</a>`
    })
    return res.json({ message: "check your email" })
}