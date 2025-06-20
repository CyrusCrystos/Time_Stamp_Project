import express from "express";
import router from "./routes.js"; // Make sure routes.js is in the same directory

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use your router for all routes
app.use("/", router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
