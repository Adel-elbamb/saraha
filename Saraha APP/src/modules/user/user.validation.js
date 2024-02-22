import joi from 'joi'
import { validationId } from '../../middleware/validation.js'
import generalFields from '../../utils/generalFields.js'

export const shareProfileSchema = joi.object({
    id: generalFields.id
}).required()

export const profileSchema = joi.object({
    authorization: generalFields.authorization
}).required()

export const changePasswordSchema = joi.object({
    authorization: generalFields.authorization,
    oldPassword: generalFields.password,
    newPassword: generalFields.password,
    cPassword: joi.string().valid(joi.ref('newPassword')).required()
}).required()

export const uploadProfilImageSchema = joi.object({
    authorization: generalFields.authorization,
    test: joi.string().required(),
    // image: joi.string().required()
    files: joi.array().items(joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
        finalDest: joi.string().required()
    }).required()).required()
}).required()