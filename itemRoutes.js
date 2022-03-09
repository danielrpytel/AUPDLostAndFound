const express = require("express");
const app = express.Router();
const itemCtrl = require("../controller/itemController");

// Get the index page
app.route("/items").get(itemCtrl.list_all_items);

app
  .route("/items/:itemId")
  .get(itemCtrl.list_item_description)
  .post(itemCtrl.claim_item)
  .delete(itemCtrl.delete_an_item);

app
  .route("/createItem")
  .get(itemCtrl.create_an_item_form)
  .post(itemCtrl.create_an_item);
//.post(itemCtrl.update_an_item);

app.route("/claimeditems").get(itemCtrl.list_all_claimed_items);

app.route("/unclaimeditems").get(itemCtrl.list_all_unclaimed_items);

app.route("/lostItemsUser").get(itemCtrl.list_all_unclaimed_items);

app
  .route("/lostItemsUser/:itemId")
  .get(itemCtrl.list_item_description)
  .post(itemCtrl.claim_item);

app
  .route("/items/:itemId")
  .get(itemCtrl.list_item_description)
  .post(itemCtrl.claim_item)
  .delete(itemCtrl.delete_an_item);

app
  .route("/editItem/:itemId")
  .get(itemCtrl.edit_item_form)
  .post(itemCtrl.update_by_id);

app.route("/claimeditems").get(itemCtrl.list_all_claimed_items);

module.exports = app;
