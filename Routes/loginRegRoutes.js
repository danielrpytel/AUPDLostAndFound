const express = require("express");
const app = express.Router();
const User = require("../model/userModel");
const user = new User();

app.get("/", (req, res, next) => {
  res.render("home", { title: "AUPD Lost and Found" });
});

app.get("/regform", (req, res, next) => {
  res.render("register", { title: "Register Account" });
});

// Post register data
app.post("/register", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
  };

  // call create function. to create a new user. if there is no error this function will return it's id.
  user.create(userInput, function (lastId) {
    // if the creation of the user goes well we should get an integer (id of the inserted user)
    if (lastId) {
      // Get the user data by it's id. and store it in a session.
      user.find(lastId, function (result) {
        req.session.user = result;
        req.session.opp = 0;
        //res.json(result)
        res.redirect("/loginform");
      });
    } else {
      console.log("Error creating a new user ...");
    }
  });
});

app.get("/loginform", (req, res, next) => {
  res.render("login", { title: "Login" });
});

// Post login data
app.post("/login", (req, res, next) => {
  // The data sent from the user are stored in the req.body object.
  // call our login function and it will return the result(the user data).
  user.login(req.body.email, req.body.password, function (result) {
    if (result) {
      // Store the user data in a session.
      req.session.user = result;
      req.session.user.loggedIn = true;

      //output message on homepage depending on if we just logged in or registered
      // opp = 1 for login; opp = 0 for register
      req.session.opp = 1;

      // redirect the user to the home page.
      res.redirect("/items");
    } else {
      // if the login function returns null send this error message back to the user.
      res.send("Username/Password incorrect!");
    }
  });
});

// Get loggout page
app.get("/logout", (req, res, next) => {
  // Check if the session is exist
  if (req.session.user) {
    // destroy the session and redirect the user to the index page.
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
});

module.exports = app;
