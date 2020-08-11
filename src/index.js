const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Recaptcha = require('express-recaptcha').RecaptchaV2
const {check, validationResult} = require("express-validator")

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const requestValidation = [
  check("email", "A valid email is required.").isEmail().normalizeEmail(),
  check("name", "A valid name is required.").not().isEmpty().trim().escape(),
  check("subject").optional().trim().escape(),
  check("message", "A valid message is required to send an email.").not().isEmpty().trim().escape().isLength({max: 2000})
]

const indexRoute = express.Router()

const indexRouteMiddleware = (request, response, nextFunction) => {
  console.log("request", request)
  return response.json("Is this thing on?")
}
const handleEmailPost = (request, response, nextFunction) => {
  response.append('Content-Type', 'text/html')

  if(request.recaptcha.error) {
    return response.send(`<div class='alert alert-danger' role='alert'><strong>Oh snap!</strong>There was an error with Recaptcha</div>`)
  }

  const errors = validationResult(request)

  if(!errors.isEmpty()) {
    const currentError = errors.array()[0]
    return response.send(Buffer.from(`<div class='alert alert-danger' role='alert'><strong>Oh snap!</strong>${currentError.msg}</div>`))
  }

}

indexRoute.route('/')
  .get(indexRouteMiddleware)
  .post(recaptcha.middleware.verify, requestValidation, handleEmailPost)

app.use('/apis', indexRoute)

app.listen(4200, () => {console.log("express server was successfully built")})

