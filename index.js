const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("./middleware/cors");
const userController = require("./controllers/users");
const postController = require("./controllers/post");
const auth = require("./middleware/auth");
dotenv.config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 3001;

start();

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database ready");
  } catch (error) {
    console.log(error.message);
    console.error("Database connection failed");
  }

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
  });
  mongoose.connection.on("error", (error) =>
    console.log("Connection failed with - ", error)
  );

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(auth());
  app.use("/users", userController);

  app.get("/", (req, res) => {
    res.json({ message: "Gastro REST service operational" });
  });

  app.listen(PORT, () => console.log(`Gastro REST service started on ${PORT}`));
}
