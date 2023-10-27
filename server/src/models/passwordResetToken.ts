// Interface

import { Model, ObjectId, Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

interface PasswordResetDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;


}
const passwordResetToken = new Schema<
  PasswordResetDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 60 min * 60 sec = 3600 sec
    default: Date.now(),
  },
});

passwordResetToken.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

passwordResetToken.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};

export default model(
  "PasswordResetToken",
  passwordResetToken
) as Model<PasswordResetDocument, {}, Methods>;
