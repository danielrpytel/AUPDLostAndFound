"use strict";
const Item = require("../model/itemModel");
const Category = require("../model/categoryModel");
const Location = require("../model/locationModel");

exports.list_all_items = function (req, res) {
  let user = req.session.user;
  Item.getAllItems(function (err, items) {
    if (err) res.send(err);
    //res.send(items); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("items", {
        title: "Lost and Found Items",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_all_claimed_items = function (req, res) {
  let user = req.session.user;
  Item.getClaimedItems(function (err, items) {
    if (err) res.send(err);
    //res.send(items); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("reportsClaimed", {
        title: "Claimed Items Report",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_all_unclaimed_items = function (req, res) {
  let user = req.session.user;
  Item.getUnclaimedItems(function (err, items) {
    if (err) res.send(err);
    //res.send(items); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("items", {
        title: "ItemsUser",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_item_description = function (req, res) {
  let user = req.session.user;
  Item.getItemById(req.params.itemId, function (err, items) {
    if (err) res.send(err);
    //res.send(items); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("itemsDescription", {
        title: "ItemDetails",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.claim_item = function (req, res) {
  let user = req.session.user.user_id;
  console.log("REQ:");
  console.log(user);
  Item.claimItem(req.params.itemId, user, function (err, item) {
    if (err) res.send(err);
    //res.send("item claimed"); // <-------FOR TESTING
    if (user == null) {
      res.render("claimedItem", { session: "Session Expired!" });
    } else {
      res.render("claimedItem", {
        title: "Item Claim",
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.create_an_item_form = function (req, res) {
  let user = req.session.user;
  Category.getAllCategories(function (err, categories) {
    Location.getAllLocations(function (err, locations) {
      if (user == null) {
        res.render("home", { session: "Session Expired!" });
      } else {
        res.render("createItem", {
          title: "Create Item Page",
          Categories: categories,
          Locations: locations,
          LoggedIn: user.loggedIn,
          Admin: user.admin,
          UserID: user.user_id,
        });
      }
    });
  });
};

exports.create_an_item = function (req, res) {
  var new_item = {
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    approx_value: req.body.approx_value,
    found_user_id: req.body.found_user_id,
    claimed_user_id: req.body.claimed_user_id,
    date_found: req.body.date_found,
    date_claimed: req.body.date_claimed,
    location_found: req.body.location_found,
    location_description: req.body.location_description,
    location_room: req.body.location_room,
    category: req.body.category,
  };

  if (new_item.approx_value === "") {
    new_item.approx_value = null;
  }
  if (!new_item.item_name || !new_item.item_description) {
    res
      .status(400)
      .send({ error: true, message: "Please provide name/description" });
  } else {
    Item.createItem(new_item, function (err, item) {
      if (err) res.send(err);
      //res.send(new_item); // <-------FOR TESTING
      res.redirect("/items");
    });
  }
};

exports.edit_item_form = function (req, res) {
  let user = req.session.user;
  let id = req.params.itemId;
  console.log("id =" + id);
  Item.getItemById(id, function (err, item) {
    if (err) res.send(err);
    Category.getAllCategories(function (err, category) {
      if (err) res.send(err);
      Location.getAllLocations(function (err, locations) {
        if (err) res.send(err);
        console.log("INSIDE EDIT ITEM FORM");
        console.log(item);
        console.log(category);
        //console.log(locations);
        res.render("editItemForm", {
          title: "Edit Item Page",
          Item: item,
          Category: category,
          Location: locations,
          LoggedIn: user.loggedIn,
          Admin: user.admin,
          UserID: user.user_id,
        });
      });
    });
  });
};

exports.update_by_id = function (req, res) {
  let id = req.params.itemId;
  console.log("Inside update_by_id");
  Item.getItemById(id, function (err, item) {
    if (err) res.send(err);
    console.log(item);
    console.log("----------------");
    console.log(item.item_ide);
    console.log(item.item_date_found);
    console.log(item.item_name);
    var new_item = {
      item_id: id,
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      approx_value: req.body.approx_value,
      claimed_user_id: item.claimed_user_id,
      date_claimed: item.date_claimed,
      location_found: req.body.location_found,
      location_description: req.body.location_description,
      location_room: req.body.location_room,
      category: req.body.category,
    };
    console.log("-------NEW ITEM------");
    console.log(new_item);
    //if estimated value of item is blank, insert null
    if (new_item.approx_value === "") {
      new_item.approx_value = null;
    }
    //handles null error
    if (!new_item.item_name || !new_item.item_description) {
      res
        .status(400)
        .send({ error: true, message: "Please provide name/description" });
    } else {
      Item.updateById(new_item, new_item.item_id, function (err, item) {
        if (err) res.send(err);
        //res.json(item);
        res.redirect("/items");
      });
    }
  });
};

exports.delete_an_item = function (req, res) {
  let user = req.session.user;
  const id = req.params.itemId;
  Item.remove(id, function (err, category) {
    if (err) res.send(err);
    const deleting = "Item";
    //res.send("deleted id:" + id); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("deleted", {
        title: "Item Delete",
        DelName: deleting,
        ID: id,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};
