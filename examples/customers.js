const WHMCS = require('../whmcs.js');

const whmcsClient = new WHMCS({
  host: process.env.WHMCS_HOST,
  identifier: process.env.WHMCS_IDENTIFIER,
  secret: process.env.WHMCS_SECRET
});

//get single clients
whmcsClient
  .get('GetClients', {
    limitnum: 10000
  })
  .then(response => console.log('clients:', response.clients.client.length));

//get single clients
whmcsClient
  .get('GetClients', {
    limitnum: 1
  })
  .then(response => console.log('clients:', response.clients.client));