const WHMCS = require('../whmcs.js');

if (!process.env.WHMCS_HOST || !process.env.WHMCS_IDENTIFIER || !process.env.WHMCS_SECRET) {
  throw new Error('SETUP YOUR ENVIRONMENT VARIABLES');
}

const whmcsClient = new WHMCS({
  host: process.env.WHMCS_HOST,
  identifier: process.env.WHMCS_IDENTIFIER,
  secret: process.env.WHMCS_SECRET
});

//get single clients
whmcsClient.get('GetClients').then(response => console.log('clients:', response.clients.client));
