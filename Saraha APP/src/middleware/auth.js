import jwt from 'jsonwebtoken'
import userModel from "../DB/models/user.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
const auth = asyncHandler(
    async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            return next(new Error('please login'))
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if (!token) {
            return next(new Error('invalid bearer key'))
        }
        const payload = jwt.verify(token, process.env.TOKEN_SIGNETURE)
        if (!payload?._id) {
            return next(new Error('invalid payload'))
        }
        const user = await userModel.findById({ _id: payload._id }).select('email')
        if (!user) {
            return next(new Error('invalid id'))
        }
        req.user = user
        next()
    }
)
export default auth