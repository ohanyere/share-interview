import { PORT, GENAI_API_KEY } from "./config/env.js";
import path from "path";
import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import { handler } from "./middlewear/route-middlewear.js";
import { fileURLToPath } from "url";

const app = express();

// Correct way to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(GENAI_API_KEY);

app.use("/api/quiz", quizRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");

  app.use(express.static(frontendPath));

  // Fallback route for React app
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) =>
    res.json({ message: "Welcome to past quiz questions" })
  );
}

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
