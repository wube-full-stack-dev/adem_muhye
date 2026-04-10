const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

app.use(express.json());

// ✅ CORS for both development AND production
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://adem-muhye.vercel.app", // Your Vercel frontend
    "https://adem-muhye-git-main.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT || 5666;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
