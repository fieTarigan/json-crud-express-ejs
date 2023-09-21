const fs = require("fs");

class Employee {
  constructor(id, name, job, age, city) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.age = age;
    this.city = city;
  }

  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile("./database/employees.json", "utf8", (err, data) => {
        if (err) reject(err);

        data = JSON.parse(data).map((datum) => {
          return new Employee(
            datum.id,
            datum.name,
            datum.job,
            datum.age,
            datum.city
          );
        });
        resolve(data);
      });
    });
  }

  static saveData(data) {
    fs.writeFileSync(
      "./database/employees.json",
      JSON.stringify(data, null, 3)
    );
  }

  static createData(employee) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          const age = Number(employee.age);

          if (isNaN(age))
            return reject(
              "Usia harus number. Silakan kembali ke halaman sebelumnya"
            );

          const newDatum = new Employee(
            data.length === 0 ? 1 : data[data.length - 1].id + 1,
            employee.name,
            employee.job,
            age,
            employee.city
          );

          data.push(newDatum);

          this.saveData(data);

          resolve({
            message: "Successfully adding data.",
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static deleteData(id) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          id = Number(id);

          if (isNaN(id) === true) {
            return reject({
              message: "Id harus number. Silakan kembali ke halaman sebelumnya",
            });
          }

          const idx = data.map((datum) => datum.id).indexOf(id);

          if (idx === -1) {
            return reject({
              message: "Id tidak ditemukan",
            });
          }
          data.splice(idx, 1);

          this.saveData(data);

          resolve({
            message: "Successfully deleting data.",
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateData(id, employee) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          id = Number(id);

          if (isNaN(id) === true) {
            return reject({
              message: "Id harus number. Silakan kembali ke halaman sebelumnya",
            });
          }

          const idx = data.map((datum) => datum.id).indexOf(id);

          if (idx === -1) {
            return reject({
              message: "Id tidak ditemukan. Silakan kembali ke halaman sebelumnya",
            });
          }
          
          let age = 0;

          if (employee.age === '' || employee.age <= 0) {
            age = data[idx].age;
          } else {
            age = Number(employee.age);
          }
          
          if (isNaN(age) === true) {
            return reject({
              message: "Age harus number. Silakan kembali ke halaman sebelumnya",
            });
          }

          data[idx] = new Employee(
            id,
            employee.name==='' ? data[idx].name : employee.name,
            employee.job==='' ? data[idx].job : employee.job,
            age,
            employee.city==='' ? data[idx].city : employee.city
          );

          this.saveData(data);

          resolve({
            message: "Successfully updating data.",
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Employee;
