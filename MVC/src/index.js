const express = require("express");

const app = express();

app.use(express.json());

const userController= require("./controllers/userController");
const batchController= require("./controllers/batchController");
const evaluationController= require("./controllers/evaluationController");
const studentController= require("./controllers/studentController");
const submissionController= require("./controllers/submissionController");

app.use("/user",userController);
app.use("/batch",batchController);
app.use("/evaluation",evaluationController);
app.use("/student",studentController);
app.use("/submission",submissionController);

module.exports = app;


