const request = require('request')
const Rx = require('rx')
const config = require('../config')
const override = require('json-override')

let jsonRpcId = 0
const jsonRpcDefaults = {
  'jsonrpc': '2.0', 'params': []
}

function getJsonRpcDefault () {
  return override(jsonRpcDefaults, { id: jsonRpcId++ }, true)
}

function call (options, callback) {
  options = override(getJsonRpcDefault(), options, true)
  const requestData = {
    url: config.rpcUrl,
    method: 'POST',
    body: JSON.stringify(options),
    headers: { 'Content-Type': 'application/json' }
  }
  request(requestData,
    function (error, curlRes, body) {
      let bodyError
      try {
        bodyError = JSON.parse(body).error
      } catch (e) {}
      if (error || (curlRes && curlRes.statusCode >= 400) || bodyError) {
        var errResponse = {
          status: (curlRes && curlRes.statusCode) || 500,
          message: error || (bodyError && bodyError.message) || body
        }
        return callback(errResponse)
      }
      let response
      try {
        response = JSON.parse(curlRes.body)
      } catch (err) { }

      console.log('Response: ', response)

      if (callback) {
        callback(null, response)
      }
    }
  )
}

function executeRequest (url, method, headers, body, callback) {
  console.log('Request: %s', url)
  var requestData = {
    url: url,
    method: method,
    rejectUnauthorized: false
  }
  if (headers) {
    requestData.headers = headers
  }
  if (body) {
    requestData.body = body
  }
  request(requestData,
    function (error, curlRes, body) {
      if (error || curlRes.statusCode >= 400) {
        return callback(error || body.message || body)
      }
      var response = curlRes.body
      try {
        response = JSON.parse(curlRes.body)
      } catch (err) { }

      // console.log('Response: %j', response)

      if (callback) {
        callback(null, response)
      }
    }
  )
}

function genericPost (url, headers, body, callback) {
  if (arguments.length === 2 && typeof (arguments[1]) === 'function') {
    executeRequest(url, 'POST', null, null, arguments[1])
  } else if (arguments.length === 3 && typeof (arguments[2]) === 'function') {
    executeRequest(url, 'POST', headers, null, arguments[2])
  } else if (arguments.length === 4) {
    executeRequest(url, 'POST', headers, body, callback)
  }
}

exports.call = Rx.Observable.fromNodeCallback(call)
exports.genericPost = Rx.Observable.fromNodeCallback(genericPost)
