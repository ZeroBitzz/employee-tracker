// todo-finished: remove testConnection() function when project is finished
// todo-finished: remove console.logs when project is finished
// todo: connect database
// todo: present options with inquirer (view departments, view roles, view employees, add department, add role, add employee, update employee role)
// todo: view department option display formatted table with departments
// todo: view roles display job title, role id, department that role belongs to, and salary for role
// todo: view employees display formatted table showing employee data
// todo: add department option
// todo: add role option
// todo: add employee option
// todo: update employee role option

const inquirer = require('inquirer')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('employee_tracker_db', 'root', '32289216', {
    host: 'localhost',
    dialect: 'mysql'
})

// test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
testConnection()

// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });