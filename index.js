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

// test the connection to the database
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
// testConnection()

// roles table model
const Roles = sequelize.define('Roles', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    },{
        freezeTableName: true
    })

// departments table model
const Departments = sequelize.define('Departments', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    },{
        freezeTableName: true
    })

// employees table model
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



    let home = true
    while(home){
        const departments = await Departments.findAll()
        for(let i=0; i<departments.length; i++){departmentsArr.push(JSON.stringify(departments[i].name, null, 4))}

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
            console.log('department')
            console.log('--------')
            departmentsArr.forEach((department) => {console.log(department)})
            console.log('')
        }else if(homeStatus === 'view roles'){
            console.log('')
            console.log('')
            console.log('')
            console.log('name of role')
            console.log('--------')
            rolesArr.forEach((role) => {console.log(role)})
            console.log('')
        }else if(homeStatus === 'view employees'){
            console.log('')
            console.log('')
            console.log('')
            console.log('name of employee')
            console.log('--------')
            rolesArr.forEach((role) => {console.log(role)})
            console.log('')
        }else if(homeStatus === 'add department'){
            console.log('')
            console.log('')
            console.log('')
            const {newDepartment} = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'What is the name of the department you would like to add?'
                }
            ])
            console.log('')
            console.log('---message---')
            console.log(`Department ${newDepartment} has been added to the database!`)
            console.log('')
            await Departments.create({name: newDepartment})
        }

        // exit app
        homeStatus === 'quit app' ? (home = false) : null
    }
}
cms()