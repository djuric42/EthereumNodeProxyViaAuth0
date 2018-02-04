# Auth0 JavaScript Login and Access to Ethereum Node

NOTE: This is adjusted Auth0 demo for JavaScript we just added part to communicate with Ethereum Node Proxy and a little change instruction below to reflect those changes. 

This sample demonstrates how to add authentication to a JavaScript application with Auth0. The sample makes use of Auth0's hosted login page which provides centralized authentication. Please check app.js fuction demoWeb3() in the same way you can use almost all methods from https://web3js.readthedocs.io/en/1.0/

## Getting Started

If you haven't already done so, [sign up](https://auth0.com) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com). Find the **domain** and **client ID** from the settings area and add the URL for your application to the **Allowed Callback URLs** box. If you are serving the application with the provided `serve` library, that URL is `http://localhost:3001`.

Clone the repo or download it from the JavaScript quickstart page in Auth0's documentation.

```bash
npm install
```

## Set the Client ID and Domain

Adjust file `auth0-variables.js` and provide the **client ID** and **domain** there.

## Run the Application

The `serve` module provided with this sample can be run with the `start` command.

```bash
npm run build
npm start
```

The application will be served at `http://localhost:3001`.

## Run the Application With Docker

In order to run the example with docker you need to have `docker` installed.

You also need to set the environment variables as explained [previously](#set-the-client-id-and-domain).

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.



