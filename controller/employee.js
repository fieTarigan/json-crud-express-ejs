const Employee = require("../model/employee");

class EmployeeController {
  static getData(req, res) {
    Employee.getData()
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.render("../view/employee.ejs", { result: data });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createData(req, res) {
    Employee.createData(req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employees");
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
    Employee.deleteData(req.params.id)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employees");
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
    Employee.updateData(req.params.id, req.body)
      .then((data) => {
        const acceptHeader = req.get("Accept");
        if (acceptHeader && acceptHeader.includes("text/html")) {
          res.redirect("/employees");
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

module.exports = EmployeeController;
