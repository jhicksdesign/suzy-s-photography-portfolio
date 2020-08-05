const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

const indexRoute = express.Router()

const indexRouteMiddleware = (request, response, nextFunction) => {
  console.log("request", request)
  return response.json("Is this thing on?")
}

indexRoute.route('/').get(indexRouteMiddleware)

app.use('/apis', indexRoute)

app.listen(4200, () => {console.log("express server was successfully built")})

