import { Router } from "express";
import { testMessage, sendMessage, deleteMessage } from "./controller/message.controller.js";
import validation from "../../middleware/validation.js";
import { deleteMessageSchema, sendMessageSchema } from "./message.validation.js";
import auth from "../../middleware/auth.js";
const router = Router()
router.get('/', testMessage)
router.post('/sendMessage/:id', validation(sendMessageSchema), sendMessage)
router.delete('/deleteMessage/:id', validation(deleteMessageSchema), auth, deleteMessage)
export default router