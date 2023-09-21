const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const port = 3000;
const route = require("./route/index");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "HR Employee Swagger",
      version: "0.1.0",
      description: "Simple CRUD API apps",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./route/*.js", "./model/*.js"],
};

const specs = swaggerJsdoc(options);

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, 'view'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(route);

app.listen(port, () => {
  console.log(`Employee app listening on port ${port}.`);
});
