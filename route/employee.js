const routeEmployee = require("express").Router();
const EmployeeController = require("../controller/employee");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - job
 *         - age
 *         - city
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-increment
 *         name:
 *           type: string
 *           description: The employee name
 *         job:
 *           type: string
 *           description: The employee job
 *         age:
 *           type: number
 *           description: The employee age
 *         city:
 *           type: string
 *           description: The employee city
 *       example:
 *         id: 1
 *         name: Nama
 *         job: Job
 *         age: 20
 *         city: Town
 * 
 * tags:
 *    name: Employee
 *    description: Employee API
 * '/employees':
 *  get:
 *      summary: List all employees
 *      tags: [Employee]
 *      responses:
 *        200:
 *          description: The employees list
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Employee'
 *        500:
 *          description: Error
 * '/employees/create':
 *  post:
 *      summary: Create a new employee data
 *      tags: [Employee]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Employee'
 *      responses:
 *          200:
 *              description: The created employee data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          500:
 *              description: Error
 * '/employees/delete/{id}':
 *  get:
 *      summary: Delete employee data by id
 *      tags: [Employee]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The employee id
 *      responses:
 *          200:
 *              description: The employee data was deleted
 *          500:
 *              description: Error
 * '/employees/update/{id}':
 *  post:
 *      summary: Update employee data by id
 *      tags: [Employee]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The employee id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Employee'
 *      responses:
 *          200:
 *              description: The employee data was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          404:
 *              description: The employee id was not found
 *          500:
 *              description: Error
 */

routeEmployee.get("/", EmployeeController.getData);

routeEmployee.post("/create", EmployeeController.createData);

routeEmployee.get("/delete/:id", EmployeeController.deleteData);

routeEmployee.post("/update/:id", EmployeeController.updateData);

module.exports = routeEmployee;
