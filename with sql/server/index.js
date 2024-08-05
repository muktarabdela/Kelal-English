require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
// connect database
connectDB()

// enable cors
app.use(cors());

// importing routes
const studentRoute = require('./router/studentRoute')
const supperAdminRoute = require('./router/superAdminRoute');
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, ቀላል English!')
})

// user routes
app.use('/kelal/api', studentRoute)
app.use('/kelal/api', supperAdminRoute)

app.listen(port, () => console.log(`server on port ${port}!`))