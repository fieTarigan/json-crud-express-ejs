const routeJob = require("express").Router();
const JobController = require("../controller/job");

routeJob.get("/", JobController.getData);

routeJob.post("/create", JobController.createData);

routeJob.get("/delete/:id", JobController.deleteData);

routeJob.post("/update/:id", JobController.updateData);

module.exports = routeJob;