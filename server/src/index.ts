import express from "express";
import "dotenv/config";
import "./db";

import authRouter from "./routers/auth";
import audioRouter from "./routers/audio";
import favoriteRouter from "./routers/favorite";
import playlistRouter from "./routers/playlist";
import profileRouter from "./routers/profile";
import historyRouter from "./routers/history";

const app = express();

// ==> Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("src/public"));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favorite", favoriteRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);
app.use("/history", historyRouter);

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log(`port listening on port ${PORT}`);
});
