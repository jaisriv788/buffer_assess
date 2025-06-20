require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDB = require("./db/index");
const app = express();

// const upload = multer({ dest: "uploads/" });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitForm = require("./routes/submitForm");
const getdetails = require("./routes/getDetails");
const getFile = require("./routes/getFile");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on: ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.log("Databse Connection Error - " + error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the React-Express-MongoDB App!");
});

app.post("/submitForm", upload.any(), submitForm);

app.get("/api/user/email/:email/files", getdetails);

app.get("/api/file/email/:email/:fileId", getFile);
