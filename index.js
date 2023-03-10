// // todo-finished: remove testConnection() function when project is finished
// todo-finished: remove needless console.logs when project is finished
// // todo: connect database
// // todo: present options with inquirer (view departments, view roles, view employees, add department, add role, add employee, update employee role)
// // todo: view department option display formatted table with departments
// // todo: view roles display job title, role id, department that role belongs to, and salary for role
// // todo: view employees display formatted table showing employee data
// // todo: add department option
// // todo: add role option
// // todo: add employee option
// todo: update employee role option

const inquirer = require('inquirer')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('employee_tracker_db', 'root', '32289216', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

// roles table model
const Roles = sequelize.define('Roles', {
    // model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleDepartment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

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
        allowNull: true
    }

    },{
        freezeTableName: true
    })
    
// main async function for running app
const cms = async () => {
    // clears the table before beginning(obviously can be removed if you want data to persist)
    await sequelize.sync({ force: true });


    // while loop that runs the app
    let home = true
    while(home){
        const departments = await Departments.findAll()

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
        if(homeStatus === 'view departments'){ // this views all departments
            console.log('')
            console.log('')
            console.log('')
            console.log('id / name')
            console.log('--------')
            const departments = await Departments.findAll();
            let idNum = 1
            departments.forEach((department) => { // displays all the departments in the database
                console.log(`${idNum} / ${department.name}`)
                idNum++
            })
            console.log('')
        }else if(homeStatus === 'view roles'){ // this views all roles
            console.log('')
            console.log('')
            console.log('')
            console.log('id / role name / role department / role salary')
            console.log('--------')
            const roles = await Roles.findAll();
            let idNum = 1
            roles.forEach((role) => { // displays all the roles in the database
                console.log(`${idNum} / ${role.name} / ${role.roleDepartment} / ${role.salary}`)
                idNum++
            })
            console.log('')
        }else if(homeStatus === 'add department'){ // this adds a department
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

        }else if(homeStatus === 'add role'){ // this adds a role to the database
            console.log('')
            console.log('')
            console.log('')
            const {newRoleName} = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRoleName',
                    message: 'What is the name of the role you would like to add?'
                }
            ])
            const rolesArr = []
            const roles = await Roles.findAll();
            roles.forEach((role) => {
                console.log('logged role in array')
                rolesArr.push(role.name)
            })
            if(rolesArr.includes(newRoleName)){
                console.log('error: there is already a role with that name')
            }else {
                const {newRoleDepartment} = await inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'newRoleDepartment',
                        message: 'What department does this role belong to?'
                    }
                ])
                const departmentsArr = []
                const departments = await Departments.findAll();
                departments.forEach((department) => {
                    departmentsArr.push(department.name)
                })
                if(!departmentsArr.includes(newRoleDepartment)){
                    console.log('error: there is no department with that name')
                    console.log(`this is the departments array: ${departmentsArr}`)
                }else{
                    console.log('')
                    console.log('---message---')
                    console.log(`department ${newRoleDepartment} accepted`)
                    const {newRoleSalary} = await inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'newRoleSalary',
                            message: 'What is the salary associated with this role?'
                        }
                    ])
                    console.log('')
                    console.log('---message---')
                    console.log(`The new role ${newRoleName} has been created in department ${newRoleDepartment} with a salary of ${newRoleSalary}!`)
                    await Roles.create({name: newRoleName, roleDepartment: newRoleDepartment, salary: newRoleSalary})
                    console.log('')
                }
            }
        }else if(homeStatus === 'add employee'){ // this adds a role to the database
            console.log('')
            console.log('')
            console.log('')
            const {newEmployeeName} = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newEmployeeName',
                    message: 'What is the name of the employee you would like to add?'
                }
            ])
            const {newEmployeeRole} = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newEmployeeRole',
                    message: 'What Role will this employee have?'
                }
            ])
            const rolesArr = []
            let roleDepartment = 5
            let roleSalary = 0
            const roles = await Roles.findAll();
            roles.forEach((role) => {
                rolesArr.push(role.name)
                if(role.name === newEmployeeRole){
                    console.log('found role department')
                    roleDepartment = role.roleDepartment
                    roleSalary = role.salary
                }
            })
            if(!rolesArr.includes(newEmployeeRole)){
                console.log('error: there is no role with that name')
                console.log(`this is the roles array: ${rolesArr}`)
            }else{
                console.log('')
                console.log('---message---')
                console.log(`role ${newEmployeeRole} accepted`)
                console.log('')
                console.log('---message---')
                console.log(`The new employee ${newEmployeeName} has been created with the role ${newEmployeeRole} in department ${roleDepartment} and has a salary of ${roleSalary}!`)
                await Employees.create({name: newEmployeeName, role: newEmployeeRole, department: roleDepartment, salary: roleSalary })
                console.log('')
            }
            
        }else if (homeStatus === 'view employees'){
            console.log('')
            console.log('')
            console.log('')
            console.log('id / employee name / employee role / employee department / employee salary')
            console.log('--------')
            const employees = await Employees.findAll();
            let idNum = 1
            employees.forEach((employee) => { // displays all the roles in the database
                console.log(`${idNum} / ${employee.name} / ${employee.role} / ${employee.department} / ${employee.salary}`)
                idNum++
            })
            console.log('')
        }

        // exit app
        homeStatus === 'quit app' ? (home = false) : null
    }
}
cms()