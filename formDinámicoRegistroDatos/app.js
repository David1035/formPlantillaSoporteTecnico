const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const apiRoutes = require('./routes/api')

const app = express()
const port = 5000;

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`)
})

app.use('/api', apiRoutes) // api routes