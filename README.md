# WHMCS Node Module

WHMCS's API Node client.
https://developers.whmcs.com/api/

This module only supports authenticating with API credentials. No one should be implementing API logins with username passwords at this point, its depreciated!

## Installation

```
npm install node-whmcs
```

## Usage

First you need to instantiate it.

```javascript
var config = new WHMCS({
  host: 'yourwebsite.com', //dont include http/https.
  endpoint: 'includes/api.php', //optional, not required
  identifier: 'api identifier',
  secret: 'api secret'
});

var whmcsClient = new WHMCS(config);
```

Using the created client, call the methods you need, example:

```javascript
//get 10 clients
whmcsClient
  .get('GetClients', {
    limitnum: 10
  })
  .then(response => console.log('clients:', response.clients.client));
```

## Examples

Check the test and examples folder for more specific use cases examples.

## License

[See License](https://github.com/maddog986/node-whmcs/blob/master/LICENSE)

## Release Notes

[See Changelog](https://github.com/maddog986/node-whmcs/blob/master/CHANGELOG.md)
