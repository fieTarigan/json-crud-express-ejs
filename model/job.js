const fs = require("fs");

class Job {
  constructor(id, name, category, max_salary, min_salary) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.max_salary = max_salary;
    this.min_salary = min_salary;
  }

  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile("./database/jobs.json", "utf8", (err, data) => {
        if (err) reject(err);

        data = JSON.parse(data).map((datum) => {
          return new Job(
            datum.id,
            datum.name,
            datum.category,
            datum.max_salary,
            datum.min_salary
          );
        });
        resolve(data);
      });
    });
  }

  static saveData(data) {
    fs.writeFileSync("./database/jobs.json", JSON.stringify(data, null, 3));
  }

  static createData(job) {
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          const max_salary = Number(job.max_salary);
          const min_salary = Number(job.min_salary);

          if (isNaN(max_salary) || isNaN(min_salary))
            return reject(
              "Salary harus number. Silakan kembali ke halaman sebelumnya"
            );

          if (max_salary < min_salary)
            return reject("Max Salary harus >= Min Salary.");

          const newDatum = new Job(
            data.length === 0 ? 1 : data[data.length - 1].id + 1,
            job.name,
            job.category,
            job.max_salary,
            job.min_salary
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

  static updateData(id, job) {
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

          let max_salary = 0;
          let min_salary = 0;

          if (job.max_salary === '' || job.max_salary <= 0) {
            max_salary = data[idx].max_salary;
          } else {
            max_salary = Number(job.max_salary);
          }

          if (job.min_salary === '' || job.min_salary <= 0) {
            min_salary = data[idx].min_salary;
          } else {
            min_salary = Number(job.min_salary);
          }

          if (isNaN(max_salary) || isNaN(min_salary))
            return reject(
              "Salary harus number. Silakan kembali ke halaman sebelumnya"
            );

          if (max_salary < min_salary)
            return reject("Max Salary harus >= Min Salary.");

          data[idx] = new Job(
            id,
            job.name==='' ? data[idx].name : job.name,
            job.category==='' ? data[idx].category : job.category,
            max_salary,
            min_salary
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

module.exports = Job;
