const route = require("express").Router();
const routeEmployee = require("./employee");
const routeEmployer = require("./employer");
const routeJob = require("./job");



/**
 * @openapi
 * tags:
 *  name: Home
 *  description: Starting point
 * '/':
 *  get:
 *      summary: This is the homepage
 *      tags: [Home]
 *      responses:
 *        '200':
 *          description: Ok
 */
route.get("/", (req, res) => {
  res.render("../view/homepage.ejs");
});



route.use("/employees", routeEmployee);
route.use("/employers", routeEmployer);
route.use("/jobs", routeJob);

module.exports = route;
