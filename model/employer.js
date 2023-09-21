const fs = require("fs");

class Employer {
  constructor(id, name, type, total_employee, city) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.total_employee = total_employee;
    this.city = city;
  }

  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile("./database/employers.json", "utf8", (err, data) => {
        if (err) reject(err);

        data = JSON.parse(data).map((datum) => {
          return new Employer(
            datum.id,
            datum.name,
            datum.type,
            datum.total_employee,
            datum.city
          );
        });
        resolve(data);
      });
    });
  }

  static saveData(data) {
    fs.writeFileSync(
      "./database/employers.json",
      JSON.stringify(data, null, 3)
    );
  }

  static createData(employer) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          const total_employee = Number(employer.total_employee);

          if (isNaN(total_employee))
            return reject(
              "total_employee harus number. Silakan kembali ke halaman sebelumnya"
            );

          const newDatum = new Employer(
            data.length === 0 ? 1 : data[data.length - 1].id + 1,
            employer.name,
            employer.type,
            total_employee,
            employer.city
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

          if (isNaN(id)) 
            return reject({
              message: "Id harus number. Silakan kembali ke halaman sebelumnya",
            });

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

  static updateData(id, employer) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          id = Number(id);

          if (isNaN(id))
            return reject({
              message: "Id harus number. Silakan kembali ke halaman sebelumnya",
            });

          const idx = data.map((datum) => datum.id).indexOf(id);

          if (idx === -1) {
            return reject({
              message: "Id tidak ditemukan",
            });
          }

          let total_employee = 0;

          if (employer.total_employee === '' || employer.total_employee <= 0) {
            total_employee = data[idx].total_employee;
          } else {
            total_employee = Number(employer.total_employee);
          }
          
          if (isNaN(total_employee) === true) {
            return reject({
              message: "total_employee harus number. Silakan kembali ke halaman sebelumnya",
            });
          }

          data[idx] = new Employer(
            id,
            employer.name==='' ? data[idx].name : employer.name,
            employer.type==='' ? data[idx].type : employer.type,
            total_employee,
            employer.city==='' ? data[idx].city : employer.city
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

module.exports = Employer;
