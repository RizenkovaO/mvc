// will add all env variable from ".env" file to node process.env
require("dotenv").config();

// do all other stuff
const express = require("express");
const path = require("path");

const StudentsController = require("./app/controllers/StudentsController");
const AuthenicationController = require("./app/controllers/AuthenicationController");

const server = express();

// set templating engine
server.set("view engine", "ejs");
// change default location of templating engine views
server.set("views", path.resolve(__dirname, "app/views"));
// export "assets" folder as public folder
server.use(express.static(path.resolve(__dirname, "assets")));
// used to parse req.body for POST,PUT requests
server.use(express.urlencoded({ extended: false }));

// routing
server.get("/", function (req, res) {
  res.render("pages/index", { content: "This is home" });
});
// students
server.get("/students/create", StudentsController.renderForm);
server.post("/students/create", StudentsController.create);
server.get("/students/:studentId?", StudentsController.main);
server.post("/students/delete/:studentId?", StudentsController.delete);
server.post("/students/:studentId?", StudentsController.update);
server.post("/login", AuthenicationController.login);
server.get("/login", AuthenicationController.renderLoginForm);
server.post("/registration", AuthenicationController.create);
server.get("/registration", AuthenicationController.renderRegForm)
// fallback to error page
server.use("*", function (req, res) {
  res.render("pages/error");
});

// start server
const port = 3000;
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
