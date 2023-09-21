const routeEmployer = require("express").Router();
const EmployerController = require("../controller/employer");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - total_employee
 *         - city
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-increment
 *         name:
 *           type: string
 *           description: The employer name
 *         type:
 *           type: string
 *           description: The employer type
 *         total_employee:
 *           type: number
 *           description: The number of employee
 *         city:
 *           type: string
 *           description: The employer city
 *       example:
 *         id: 1
 *         name: Nama
 *         type: Corporate
 *         total_employee: 20
 *         city: Town
 * 
 * tags:
 *    name: employer
 *    description: employer API
 * /employers:
 *  get:
 *      summary: List all employers
 *      tags: [employer]
 *      responses:
 *        200:
 *          description: The employers list
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/employer'
 *        500:
 *          description: Error
 * /employers/create:
 *  post:
 *      summary: Create a new employer data
 *      tags: [employer]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                    $ref: '#/components/schemas/employer'
 *      responses:
 *          200:
 *              description: The created employer data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/employer'
 *          500:
 *              description: Error
 * '/employers/delete/{id}':
 *  get:
 *      summary: Delete employer data by id
 *      tags: [employer]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The employer id
 *      responses:
 *          200:
 *              description: The employer data was deleted
 *          500:
 *              description: Error
 * '/employers/update/{id}':
 *  post:
 *      summary: Update employer data by id
 *      tags: [employer]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The employer id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/employer'
 *      responses:
 *          200:
 *              description: The employer data was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/employer'
 *          404:
 *              description: The employer id was not found
 *          500:
 *              description: Error
 */

routeEmployer.get("/", EmployerController.getData);

routeEmployer.post("/create", EmployerController.createData);

routeEmployer.get("/delete/:id", EmployerController.deleteData);

routeEmployer.post("/update/:id", EmployerController.updateData);

module.exports = routeEmployer;