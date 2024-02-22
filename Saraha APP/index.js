import express from 'express'
import bootstrap from './src/bootstrap.js'
import dotenv from 'dotenv'
import sendEmail from './src/utils/email.js'
const app = express()
dotenv.config()
const port = +process.env.PORT
bootstrap(app, express)

import QRCode from 'qrcode'

// QRCode.toDataURL('http://localhost:3000/user/658096cf2928fdfeca020905', function (err, url) {
//     console.log(url)
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))