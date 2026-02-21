const express = require("express");
require("dotenv").config();
const cors = require("cors"); 
const routes = require("./routes/index"); // your main router

const app = express();

app.use(express.json()); // parse JSON body
// ✅ FIXED CORS - Allow BOTH ports 5173 AND 5174
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS with options
app.use(cors(corsOptions));
app.use(routes); // use all routes

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}`);
});
