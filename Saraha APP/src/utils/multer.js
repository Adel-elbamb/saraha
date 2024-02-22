import multer from "multer"
import { nanoid } from "nanoid"
import fs from 'fs'
import path from "path"
export const validationTypes = {
    image: ['image/png', 'image/jpeg'],
    pdf: ['application/pdf']
}
const uploadFile = ({ customTypes, customPath = "general" } = {}) => {
    const filePath = path.resolve(`uploads/${customPath}`)
    if (!fs.existsSync(`${filePath}`)) {
        fs.mkdirSync(`${filePath}`, { recursive: true })
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${filePath}`)
        },
        filename: (req, file, cb) => {
            const finalName = nanoid() + "_" + file.originalname
            file.finalDest = `uploads/${customPath}/${finalName}`
            cb(null, finalName)
        }
    })
    const fileFilter = (req, file, cb) => {
        console.log(file.mimetype);
        if (customTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('invalid formate'), false)
        }
    }
    const upload = multer({ dest: 'uploads', fileFilter, storage })

    return upload
}

export default uploadFile