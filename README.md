# WHMCS Node Module

This is an unofficial [WHMCS](https://whmcs.com)'s [API](https://developers.whmcs.com/api/) Node client.

This module only supports authenticating with API credentials. No one should be implementing API logins with username passwords at this point, its depreciated!

You can test this plugin live at https://codesandbox.io/s/x37v93mwkw

## Installation

```
npm install node-whmcs
```

## Usage

First you need to instantiate it.

```javascript
const whmcsClient = new WHMCS({
  host: 'yourwebsite.com', //dont include http/https.
  identifier: 'api identifier',
  secret: 'api secret'
  //endpoint: 'includes/api.php', //only required if you changed the api.php location
});
```

Using the created client, call the methods you need, example:

```javascript
//get 10 clients
whmcsClient
  .get('Clients', {
    limitnum: 10
  })
  .then(response => console.log('10 clients:', response.clients.client));

//update a client
whmcsClient
  .update('Client', {
    clientid: 1,
    firstname: 'John',
    lastname: 'Doe'
  })
  .then(response => console.log('client updated response:', response));

//delete the first client
whmcsClient
  .delete('Client', {
    clientid: 1
  })
  .then(response => console.log('client deleted response:', response));

//get 10 clients
whmcsClient
  .call('DomainWhois', {
    domain: "example.com"
  })
  .then(response => console.log('domain information:", response));
```

## License

[See License](https://github.com/maddog986/node-whmcs/blob/master/LICENSE)

## Release Notes

[See Changelog](https://github.com/maddog986/node-whmcs/blob/master/CHANGELOG.md)
