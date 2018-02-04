var request = require('request')

/**
 * HttpProvider should be used to send rpc calls over http
 */
var HttpHeaderProvider = function HttpHeaderProvider (host, headers, timeout) {
  this.host = host || 'http://localhost:8545'
  this.headers = headers
  this.timeout = timeout || 0
  this.connected = false
}

/**
 * Should be used to make async request
 *
 * @method send
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
HttpHeaderProvider.prototype.send = function (payload, callback) {
  var requestData = {
    url: this.host,
    method: 'POST',
    rejectUnauthorized: false
  }
  if (this.headers) {
    requestData.headers = this.headers
  }
  requestData.headers['Content-Type'] = 'application/json'

  requestData.body = JSON.stringify(payload)

  request(requestData,
    function (error, curlRes, body) {
      if (error || (curlRes && curlRes.statusCode >= 400)) {
        var errResponse = {
          status: (curlRes && curlRes.statusCode) || 500,
          message: error || body
        }
        return callback(errResponse)
      }
      var response = curlRes.body
      try {
        response = JSON.parse(curlRes.body)
      } catch (err) { }
      if (response.error) return callback(response.error)

      callback(null, response)
    }
  )
}

module.exports = HttpHeaderProvider
