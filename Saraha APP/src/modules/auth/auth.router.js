import { Router } from "express";
import { signUp, logIn, confirmEmail, refreshToken } from "./controller/auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import validation from "../../middleware/validation.js";
import { loginSchema, signupSchema } from "./auth.validation.js";

const router = Router()
router.get('/confirmEmail/:token', asyncHandler(confirmEmail))
router.get('/refreshToken/:token', asyncHandler(refreshToken))
router.post('/signUp', validation(signupSchema), asyncHandler(signUp))
router.post('/logIn', validation(loginSchema), asyncHandler(logIn))
export default router