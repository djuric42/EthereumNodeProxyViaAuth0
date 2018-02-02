const express = require('express')
const router = express.Router()
const validate = require('express-validation')
const validrpc = require('../validation/validrpc')
const bearerToken = require('express-bearer-token')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const jsonrpc = require('../modules/jsonrpc')

router.all('*', bearerToken(), (req, res, next) => {
  const cert = fs.readFileSync('auth0-client.pem')
  try {
    jwt.verify(req.token, cert)
    next()
  } catch (err) {
    res.status(401).json({ error: { code: 401, msg: err } })
  }
})

router.post('/', validate(validrpc), (req, res, next) => {
  jsonrpc.call(req.body).subscribe(
    result => {
      console.log('On next:', result.result)
      res.json(result)
    },
    err => {
      console.log('Error: ', err)
      if (err.stack) {
        console.log(err.stack)
      }
      res.status(err.status).json({ error: err.message })
    },
    () => console.log('Completed')
  )
})

module.exports = router
