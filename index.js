const express = require('express')
const database = require('./database/connection')

const app = express()

app.listen(process.env.port || 5000, () => {
    console.log(`server is running on ${process.env.port || 5000}`)
})