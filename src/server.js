import app from "./app.js";
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import  "dotenv/config";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import bodyParser from "body-parser";
import multer from "multer";

const expApp = express();
expApp.use(bodyParser.urlencoded({ extended: true }));
expApp.use(bodyParser.json());
const forms = multer()

expApp.use(forms.array())

const PORT = process.env.PORT || 3000;

expApp.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);

// Routes

expApp.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello from Server!");
});

expApp.use("/", app);

expApp.use(errorMiddleware);


dbConnection().then(() => {
  expApp.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
