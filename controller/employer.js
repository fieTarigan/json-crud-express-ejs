const Employer = require('../model/employer');

class EmployerController {
  static getData(req, res) {
    Employer.getData()
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.render("../view/employer.ejs", { result: data });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createData(req, res) {
    Employer.createData(req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employers");
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
    Employer.deleteData(req.params.id)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employers");
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
    Employer.updateData(req.params.id, req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employers");
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

module.exports = EmployerController;