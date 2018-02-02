module.exports = {
  rpcUrl: process.env.RPC_URL || 'http://localhost:8545', // Ethereum Node RPC url, it should be on the same server, but port need to be closed for public access so the only way need to be thourough proxy with auth0 authentication
  npLocation: process.env.NP_LOCATION || 'np' // location https://example.net/np, put without head and tail slash (/), allowed also empty string
}
