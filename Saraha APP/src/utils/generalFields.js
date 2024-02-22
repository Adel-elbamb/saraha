import joi from "joi"
import { validationId } from "../middleware/validation.js"

const generalFields = {
    email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    id: joi.custom(validationId).required(),
    authorization: joi.string().required()
}
export default generalFields