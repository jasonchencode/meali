import express from "express";
import userProfileRouter from "./routes/userProfile";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api/user/profile", userProfileRouter);

app.listen(PORT, () => {
  console.log(`meali backend running on port ${PORT}`);
});
