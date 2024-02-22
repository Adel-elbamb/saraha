import joi from 'joi'
import generalFields from '../../utils/generalFields.js'

export const sendMessageSchema = joi.object({
    message: joi.string().min(10).max(200).required(),
    id: generalFields.id
}).required()

export const deleteMessageSchema = joi.object({
    id: generalFields.id,
    authorization: generalFields.authorization
}).required()