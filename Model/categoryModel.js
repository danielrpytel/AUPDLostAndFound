"use strict";
var sql = require("../db");

//Category object constructor
var Category = function (category) {
  this.category_name = category.category_name;
};

Category.createCategory = function (newCat, result) {
  sql.query("INSERT INTO category set ?", newCat, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Category.getCategoryById = function (categoryId, result) {
  sql.query(
    "SELECT category_id, category_name from category WHERE category_id = ? ",
    categoryId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Category.getOneCategory = function (id, callback) {
  let sqlStr = `SELECT * FROM category WHERE category_id = ?`;

  sql.query(sqlStr, id, function (err, result) {
    if (err) throw err;
    //console.log(result);

    if (result.length) {
      return result[0];
    } else {
      return null;
    }
  });
};

Category.getOneCategory = function (id, callback) {
  let sqlStr = `SELECT * FROM category WHERE category_id = ?`;

  sql.query(sqlStr, id, function (err, result) {
    if (err) throw err;
    //console.log(result);

    if (result.length) {
      callback(result[0]);
    } else {
      callback(null);
    }
  });

  if (result.length) {
    callback(result[0]);
  } else {
    callback(null);
  }
};

Category.getAllCategories = function (result) {
  sql.query("Select * from category", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Category.updateById = function (id, task, result) {
  sql.query(
    "UPDATE tasks SET task = ? WHERE id = ?",
    [task.task, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Category.remove = function (id, result) {
  sql.query(
    "DELETE FROM category WHERE category_id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Category;
