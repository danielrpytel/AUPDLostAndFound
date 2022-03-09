// GET, POST, DELETE functionality for locations table
"use strict";
var Location = require("../model/locationModel");

// Get a list of locations from database and render it with "locations.pug"
exports.list_all_locations = function (req, res) {
  // get session information about user who is logged in
  let user = req.session.user;

  // call getAllLocations method fom locations model to retrieve data
  Location.getAllLocations(function (err, locations) {
    //check to see if there is an error in retrieving data
    if (err) res.send(err);

    //res.send(locations); // <-------FOR TESTING

    //if user doesn't exist, show home screen
    //else render the locations page for admin
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("locations", {
        title: "AU Locations",
        Data: locations,
        LoggedIn: user.loggedIn,
        Admin: user.admin,
      });
    }
  });
};

// Get req.body data to create a new location
exports.create_location = function (req, res) {
  // create new location object based on req.body
  var new_location = new Location(req.body);

  //if non-required fields are blank, set them to null
  if (new_location.room === "") {
    new_location.room = null;
  }
  //if required field is null, send error
  if (!new_location.location_name) {
    res.status(400).send({
      error: true,
      message: "Please provide location name",
    });
  } else {
    //create new location with new location object
    //then redirect user to location page
    Location.createLocation(new_location, function (err, location) {
      if (err) res.send(err);
      //res.send(new_location); // <-------FOR TESTING
      res.redirect("/locations");
    });
  }
};

// Delete functionality for locations
exports.delete_a_location = function (req, res) {
  // store sessions information about user who is logged in
  let user = req.session.user;
  // get location id from request body 
  const id = req.params.locatId;

  //call remove function from model with location id to delete item
  Location.remove(id, function (err, location) {
    //check for errors
    if (err) res.send(err);
    //res.send("deleted location id: " + id); // <-------FOR TESTING

    //if user doesn't exist, render home
    //else render page showing location was deleted successfully
    if (user == null) {
      res.render("home");
    } else {
      res.render("deleted", {
        title: "Location Delete",
        DelName: "Location",
        ID: id,
        LoggedIn: user.loggedIn,
        Admin: user.admin,
      });
    }
  });
};
