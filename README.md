# EthereumNodeProxyViaAuth0

Ethereum Node Proxy via Auth0 (ENPA) allows users to use Ethereum Node in order to connect web3 or use RPC calls directly to ethereum Node which is protected by Auth0 Authorization.

 1. Install geth from https://geth.ethereum.org/downloads/ 
 2. Start geth node with command:
    ```
    geth --rinkeby --rpc --rinkeby --fast --cache=512 -ws --rpccorsdomain '*'  --rpcapi "db,eth,net,web3,personal"
    ```
 3. Create Client on Auth0 of type Single Page Application 
 4. Get Client certificate. You will need on bottom to click on Show Advanced Settings

    ![alt text](https://i.imgur.com/PJcABkP.jpg)

 5. On the same page go to Grant Type and enable Password
 6. On the top right click on profile avatar and choose settings. Enter for Default Directory: Username-Password-Authentication

    ![alt text](https://i.imgur.com/8XiY3tP.jpg)

 7. Install Ethereum Node Proxy via Auth0 (ENPA) via command: npm i
 8. Setup ENPA change config.json

    **rpcUrl**: 'http://localhost:8545', // Ethereum Node RPC url, it should be on the same server or on the server where is allowed only access from ENPA IP address on port 8545 port need to be closed for public access so the only way need to be thorough proxy with auth0 authentication

    **npLocation**: 'np' // location https://example.net/np, put without head and tail slash (/), allowed also empty string
9. Paste certificate from step 4 in file auth0-client.pem, overwrite any existing content
10. Use following Postman to test RPC calls https://www.getpostman.com/collections/c08c0f71766c16e19d1b 

11. Full List of JSON-RPC calls https://github.com/ethereum/wiki/wiki/JSON-RPC You can ommit **jsonrpc**, **id** and also params if there are no required for method, but **method** you must always provide from body request 

12. For using web3js library instead of JSON-RPC calls please check example in directory examples/frontend