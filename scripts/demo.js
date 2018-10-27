import express from 'express'
import winston from 'winston'
import path from 'path'

const PORT = process.env.PORT || 8080

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

const app = express()

app.use(express.static(path.join(__dirname, '../build')))

app.listen(PORT, () => {
  logger.info(`listening on http://localhost:${PORT}`)
})
