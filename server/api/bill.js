const billController = require("../controller/billController");
const express = require('express');
const api = express.Router()

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


api.route("/api/bill/")
  .get(use(billController.get))
  .post(use(billController.add))

api.route("/api/bill/:id")
  .get(use(billController.get))
  .put(use(billController.update))
  .delete(use(billController.delete))

module.exports = api