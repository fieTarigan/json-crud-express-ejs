const Job = require('../model/job');

class JobController {
  static getData(req, res) {
    Job.getData()
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.render("../view/job.ejs", { result: data });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createData(req, res) {
    Job.createData(req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/jobs");
        } else {
          res.send(data);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static deleteData(req, res) {
    Job.deleteData(req.params.id)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/jobs");
        } else {
          res.send(data);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static updateData(req, res) {
    Job.updateData(req.params.id, req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/jobs");
        } else {
          res.send(data);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = JobController;