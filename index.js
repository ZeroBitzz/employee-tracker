// todo-finished: remove testConnection() function when project is finished
// todo-finished: remove console.logs when project is finished
// // todo: connect database
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
    dialect: 'mysql',
    logging: false
})

// // test the connection
// const testConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// testConnection()

const Roles = sequelize.define('Roles', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    },{
        freezeTableName: true
    })
    
const Departments = sequelize.define('Departments', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    },{
        freezeTableName: true
    })

const Employees = sequelize.define('Employees', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: false
    }

    },{
        freezeTableName: true
    })
    
    
    const departmentsArr = []
    const rolesArr = []
    
    const cms = async () => {
        await sequelize.sync({ force: true });
        const departments = await Departments.findAll()
        for(let i=0; i<departments.length; i++){departmentsArr.push(JSON.stringify(departments[i].name, null, 4))}
        const role1 = await Roles.create({ name: 'software engineer'}) // this line creates and saves the user to the database
        const depo1 = await Departments.create({ name: 'engineering'}) // this line creates and saves the user to the database


    let home = true
    while(home){
        const {homeStatus} = await inquirer
        .prompt([
          {
              type: 'list',
              name: 'homeStatus',
              message: 'What would you like to do?',
              choices: [
                  'view departments', 'view roles', 'view employees', 'add department', 'add role', 'add employee', 'update employee role', 'quit app'
              ]
          }
        ])

        // displays departments
        if(homeStatus === 'view departments'){
            console.log('')
            console.log('')
            console.log('')
            console.log('name of department')
            console.log('--------')
            departmentsArr.forEach((department) => {console.log(department)})
            console.log('')
        }

        // exit app
        homeStatus === 'quit app' ? (home = false) : null
    }
}
cms()