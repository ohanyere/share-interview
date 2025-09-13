import path from "path"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./routes/quizRoutes.js";
import { handler } from "./middlewear/route-middlewear.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use("/api/quiz", quizRoutes);



app.use(handler)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  app.get("*", (reg, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"))
}else{
  app.get("/", (req, res) => res.json({ message: "welcome to past quiz questions" }));
}

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
