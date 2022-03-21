const express = require('express');
const app = express.Router();
const locationCtrl = require('../controller/locationController');

// Get the index page
app.route('/locations')
    .get(locationCtrl.list_all_locations)
    .post(locationCtrl.create_location);

app.route('/location/:locatId')
    .delete(locationCtrl.delete_a_location);

module.exports = app;