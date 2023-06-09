const express = require('express')
const app = express();
const mongoose = require('mongoose')
const { MONGO_DB_CONFIG } = require('./config/app.config')
const errors = require('./middleware/errors.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

require('dotenv').config()
const PORT = process.env.PORT || 3000

// legacy code! mongoose 4 relied on that because it has its own 
// promise implementation
// mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO_DB_CONFIG.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("Database connected");
        },
        (error) => {
            console.log("Database can't be connected: " + error);
        }
    )

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api', require('./routes/app.routes'))
app.use(errors.errorHandler)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log(`Server is listening on Port: http://localhost:${PORT}`)
})


