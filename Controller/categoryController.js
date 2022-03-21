// GET, POST, DELETE functionality for categories table
"use strict";
const Category = require("../model/categoryModel");

// Get all category data from table and render it onto categories page
exports.getCategories = function (req, res) {
  //store session information on user that is logged in
  let user = req.session.user;

  // call getAllCategories function from model to query database
  Category.getAllCategories(function (err, categories) {
    if (err) res.send(err);
    //res.send(categories); // <-------FOR TESTING
    //check if user is logged in, if not then go to home page
    //if logged in then render categories
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("categories", {
        title: "Test application",
        Data: categories,
        LoggedIn: user.loggedIn,
        Admin: user.admin,
      });
    }
  });
};

// Get req.body data to create a new category
exports.create_a_category = function (req, res) {
  // create new category object based on req.body
  var new_category = new Category(req.body);

  //if required field is null, send error
  //else create category and render categories page
  if (!new_category.category_name) {
    res.status(400).send({ error: true, message: "Please provide name" });
  } else {
    Category.createCategory(new_category, function (err, category) {
      if (err) res.send(err);
      //res.send(new_category); // <-------FOR TESTING
      res.redirect("/categories");
    });
  }
};

// Delete functionality for categories
exports.delete_a_category = function (req, res) {
  //store session information on user that is logged in
  let user = req.session.user;

  // get category id from request body
  const id = req.params.catId;

  // Call remove function from model to query database and delete category
  Category.remove(id, function (err, category) {
    if (err) res.send(err);
    const deleting = "Category";
    //res.send("deleted:" + category); // <-------FOR TESTING
    // check if user is logged in, if not then render home
    //if logged in sthen delete category and render page showing success with id of deleted category
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("deleted", {
        title: "Category Delete",
        DelName: deleting,
        ID: id,
        LoggedIn: user.loggedIn,
        Admin: user.admin,
      });
    }
  });
};
