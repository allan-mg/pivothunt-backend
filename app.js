require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./middlewares/auth");

const {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
} = require("./controllers/users");

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} = require("./controllers/applications");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/users/me", auth, getCurrentUser);
app.patch("/users/me", auth, updateCurrentUser);
app.post("/applications", auth, createApplication);
app.get("/applications", auth, getApplications);
app.patch("/applications/:applicationId/status", auth, updateApplicationStatus);
app.patch("/applications/:applicationId/notes", auth, updateApplicationNotes);
app.delete("/applications/:applicationId", auth, deleteApplication);

app.get("/", (req, res) => {
  res.send("PivotHunt API is running");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
