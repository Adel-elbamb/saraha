import { Router } from "express";
import { profile, shareProfile, uploadCoverImage, changePassword, uploadProfilImage } from "./controller/user.controller.js";
import auth from "../../middleware/auth.js";
import { changePasswordSchema, uploadProfilImageSchema, profileSchema, shareProfileSchema } from "./user.validation.js";
import validation from "../../middleware/validation.js";
import uploadFile, { validationTypes } from "../../utils/multer.js";

const router = Router()
router.get('/', validation(profileSchema), auth, profile)
router.get('/:id', validation(shareProfileSchema), shareProfile)
router.patch('/changePassword', validation(changePasswordSchema), auth, changePassword)
router.patch('/uploadProfilImage', auth,
    uploadFile({ customTypes: validationTypes.image, customPath: 'user/profile' }).single('image'),
    validation(uploadProfilImageSchema), uploadProfilImage)

router.patch('/uploadCoverImage'
    , auth,
    uploadFile({ customTypes: validationTypes.image, customPath: 'user/cover' }).array('image', 4),
    validation(uploadProfilImageSchema),
    uploadCoverImage)
export default router