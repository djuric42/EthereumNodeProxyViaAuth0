const express = require('express')
const router = express.Router()
const bearerToken = require('express-bearer-token')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const proxy = require('express-http-proxy')
const config = require('../config')

router.all('*', bearerToken(), (req, res, next) => {
  const cert = fs.readFileSync('auth0-client.pem')
  try {
    jwt.verify(req.token, cert)
    next()
  } catch (err) {
    res.status(401).json({ error: { code: 401, msg: err } })
  }
})

router.use('/', proxy(config.rpcUrl))

module.exports = router
