"use strict";
var sql = require("./db");

//Location object constructor
var Location = function (location) {
  this.location_name = location.location_name;
  this.floor = location.floor;
};

// Query the database to insert new object into location table
Location.createLocation = function (newLocation, result) {
  sql.query("INSERT INTO location set ?", newLocation, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("res in locationModel.js: ", res);
      //console.log("locationModel.js res.insertID: ", res.insertId);
      // insertID is the id of the new object created
      result(null, res.insertId);
    }
  });
};

// query database to get all items from location table
// order the locations by name then floor numbers
Location.getAllLocations = function (result) {
  sql.query(
    "Select * from location ORDER BY location_name ASC, floor",
    function (err, res) {
      //check for errors, if none then send data back
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        //console.log('location : ', res);
        result(null, res);
      }
    }
  );
};

// Query database to get specific location information by location id
Location.getLocationById = function (id, result) {

  sql.query(
    "SELECT * FROM location WHERE location_id = ? ",
     id,
     function (err, res) {
       //check for errors, if none, send data back
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        //console.log('location : ', res);
        result(null, res);
      }
  });
};

// Query database to delete specific location item by the id
Location.remove = function (id, result) {
  sql.query(
    "DELETE FROM location WHERE location_id = ?",
    [id],
    function (err, res) {
      //check for errors, if none then send data back of item deleted
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Location;
