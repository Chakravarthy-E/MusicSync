import { Router } from "express";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";

import { validate } from "#/middleware/validator";
import {
  SignIn,
  create,
  generateForgetPassword,
  grantValid,
  sendVerificationToken,
  updatePassword,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken, mustAuth } from "#/middleware/auth";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "#/utils/variables";
import User from "#/models/user";

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
  validate(UpdatePasswordSchema),
  isValidPassResetToken,
  updatePassword
);

router.post("/sign-in", validate(SignInValidationSchema), SignIn);

router.get("/is-auth", mustAuth, (req, res) => {
  res.json({
    profile: req.user,
  });
});

router.get("/public", (req, res) => {
  res.json({
    message: "your in public route",
  });
});

router.get("/private", mustAuth, (req, res) => {
  res.json({
    message: "your in private route",
  });
});
export default router;
