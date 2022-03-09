const express = require("express");
const session = require("express-session");
const path = require("path");
// Page routes
const CategoryRouter = require("./routes/categoryRoutes");
const LocationRouter = require("./routes/locationRoutes");
const ItemRouter = require("./routes/itemRoutes");
const UserRouter = require("./routes/loginRegRoutes");

var methodOverride = require("method-override");
const app = express();
const cors = require("cors");
app.use(cors());

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded({ extended: false }));

// Allows PUT and DELETE requests to be sent through forms
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, "public")));

// Template engine. PUG
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// session
app.use(
  session({
    secret: "bookstoresecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30 * 60,
    },
  })
);

// Page Routers
app.use("/", CategoryRouter, LocationRouter, ItemRouter, UserRouter);

// Errors => page not found 404
app.use((req, res, next) => {
  var err = new Error("404: Page not found");
  err.status = 404;
  next(err);
});

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// Setting up the server
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});

module.exports = app;
