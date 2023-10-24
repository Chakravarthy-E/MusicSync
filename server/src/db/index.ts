import mongoose from "mongoose";
import { MONGO_URI } from "#/utils/variables";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("db connection failed ", error);
  });
