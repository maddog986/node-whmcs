if (!process.env.WHMCS_HOST || !process.env.WHMCS_IDENTIFIER || !process.env.WHMCS_SECRET) {
  throw new Error('SETUP YOUR ENVIRONMENT VARIABLES');
}

const WHMCS = require('../whmcs.js');

const whmcsClient = new WHMCS({
  host: process.env.WHMCS_HOST,
  identifier: process.env.WHMCS_IDENTIFIER,
  secret: process.env.WHMCS_SECRET
});

//get 1 client
whmcsClient
  .get('Clients', {
    limitnum: 1
  })
  .then(clients => console.log('clients:', clients))
  .catch(err => console.log('ERROR:', err));
