const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const commentsController = require("./controller/comments");
const hardwareController = require("./controller/hardware");
const myPCController = require("./controller/mypc");
const userController = require("./controller/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/comments", commentsController);
app.use("/user", userController);
app.use("/mypc", myPCController);
app.use("/hardware", hardwareController);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
