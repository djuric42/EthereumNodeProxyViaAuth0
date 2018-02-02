const assert = require('assert')
const jsonrpc = require('../modules/jsonrpc')
const auth0Body = JSON.stringify(
  {
    grant_type: 'password',
    client_id: '5Mksd2dwU5raiaKkipF6uS6W8PvR8DHM',
    username: 'developer@celsius.network',
    password: 'southcel4'
  }
)
let headers = { 'Content-Type': 'application/json' }

describe('Test JSONRPC', () => {
  it('should pass whole flow', () => {
    jsonrpc.genericPost('https://celsiusnetwork.auth0.com/oauth/token', headers, auth0Body)
      .flatMap((result) => {
        headers.authorization = 'Bearer ' + result.id_token
        return jsonrpc.genericPost('http://localhost:3000/rpc', headers, JSON.stringify({ method: 'shh_version' }))
      })
      .subscribe(
      result => {
        console.log('On next:', result)
        assert.equal(result.result, '5.0', 'Wrong version')
      },
      err => {
        console.log('Error: ', err)
        if (err.stack) {
          console.log(err.stack)
        }
        assert.equal(err, '', 'Error occured: ' + err)
      },
      () => console.log('Completed')
      )
  })
})
