import userRouter from './modules/user/user.router.js'
import messageRouter from './modules/message/message.router.js'
import authRouter from './modules/auth/auth.router.js'
import connection from './DB/connection.js'
import { globalError } from './utils/asyncHandler.js'

const bootstrap = (app, express) => {

    connection()
    app.use(express.json())
    app.use('/uploads', express.static('uploads'))
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/message', messageRouter)
    app.use('*', (req, res, next) => {
        return res.json({ message: "Invalid Routing" })
    })

    //FAILER ERROR
    app.use(globalError)
}
export default bootstrap