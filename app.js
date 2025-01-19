const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const apiRoutes = require('./routes/api')
const sequelize = require('./config/db')
const Form = require('./models/Form')

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

// crea la bd de datos, si no existe
sequelize.sync({ force: true })
    .then(() => {
        console.log('Base de datos creada')
    })
    .catch((err) => console.error('error al sincronizar db ', err))
