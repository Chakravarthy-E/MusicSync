import { Router } from "express";
import {
  CreateUserSchema,
  EmailVerificationBody,
} from "#/utils/validationSchema";

import { validate } from "#/middleware/validator";
import {
  create,
  generateForgetPassword,
  sendVerificationToken,
  verifyEmail,
} from "#/controllers/user";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendVerificationToken);
router.post("/forget-password", generateForgetPassword);

export default router;
