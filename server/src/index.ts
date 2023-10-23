import express from "express";

const app = express();

const PORT = 8989;

app.listen(PORT, () => {
  console.log(`port listening on port ${PORT}`);
});
