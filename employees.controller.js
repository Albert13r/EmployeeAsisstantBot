const db = require('./db')
class EmployeesController { 
  async getAllEmployees(req, res){
    const employees = await db.query(`SELECT * FROM employees`);
    res.json(employees.rows);
  }
}


module.exports = new EmployeesController();
