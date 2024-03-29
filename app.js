const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDatabase = require('./startUp/initDataBase.js')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)
const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'prodaction') {
    console.log('Prodaction')
} else {
    console.log('Development')
}

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.blue('MongoDb connect'))
        app.listen(
            PORT,
            console.log(
                chalk.green(`Server has been started on port ${PORT}...`)
            )
        )
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}
start()
