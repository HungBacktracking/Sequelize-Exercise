const express = require("express");
const controller = require("../controllers/blogController.js")
const route = express.Router();

route.use("/", controller.init);
route.get("/", controller.showList);
route.get('/:id', controller.showDetails);

module.exports = route;