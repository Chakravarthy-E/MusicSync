import { Router } from "express";
import {
  CreateUserSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";

import { validate } from "#/middleware/validator";
import {
  create,
  generateForgetPassword,
  grantValid,
  sendVerificationToken,
  updatePassword,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(UpdatePasswordSchema), verifyEmail);
router.post("/re-verify-email", sendVerificationToken);
router.post("/forget-password", generateForgetPassword);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  grantValid
);

router.post(
  "/update-password",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  updatePassword
);
export default router;
