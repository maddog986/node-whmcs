# WHMCS Node API Module

This is an unofficial [WHMCS](https://whmcs.com)'s [API](https://developers.whmcs.com/api/) Node API client.

This module only supports authenticating with API credentials. No one should be implementing API logins with username passwords at this point, its [depreciated](https://developers.whmcs.com/api/authentication/) as of 7.2!

Please report any bugs using the [issue tracker](https://github.com/maddog986/node-whmcs/issues).

Positive feedback helps fuel development. This module is very simple yet effective for my business needs. PR requests are welcome!

### Installation

```
npm install node-whmcs
```

## Usage

First you need to instantiate it.

```javascript
const WHMCS = require('node-whmcs');

const whmcsClient = new WHMCS({
  host: 'yourwebsite.com', //dont include http/https.
  identifier: 'api identifier',
  secret: 'api secret'
  //endpoint: 'includes/api.php', //only required if you changed the api.php location
});
```

Using the created client, call the methods you need, example:

```javascript
//get 10 clients. see https://developers.whmcs.com/api-reference/getclients/
whmcsClient
  .get('Clients', {
    limitnum: 10
  })
  .then(clients => console.log('10 clients:', clients))
  .catch(err => console.log('ERROR:', err));

//update a client. see https://developers.whmcs.com/api-reference/updateclient/
whmcsClient
  .update('Client', {
    clientid: 1,
    firstname: 'John',
    lastname: 'Doe'
  })
  .then(client => console.log('client updated response:', client))
  .catch(err => console.log('ERROR:', err));

//delete the first client. see https://developers.whmcs.com/api-reference/deleteclient/
whmcsClient
  .delete('Client', {
    clientid: 1
  })
  .then(response => console.log('client deleted response:', response))
  .catch(err => console.log('ERROR:', err));

//get domain details. see https://developers.whmcs.com/api-reference/domainwhois/
whmcsClient
  .call('DomainWhois', {
    domain: 'whmcs.com'
  })
  .then(response => console.log('domain information:', response))
  .catch(err => console.log('ERROR:', err));
```

## Implemented Functions

#### Main function:

- call(action, options):

##### Helper Functions:

- get(action, options): An alias of "call" but appends "Get" to the name.
- add(action, options): An alias of "call" but appends "Add" to the name.
- update(action, options): An alias of "call" but appends "Update" to the name.
- delete(action, options): An alias of "call" but appends "Delete" to the name.

The "action" (string) is the name of a [WHMCS API Index](https://developers.whmcs.com/api/api-index/) name. The "options" (object) of any parameters you want to pass in.

## Release Notes

[See Changelog](https://github.com/maddog986/node-whmcs/blob/master/CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2019 Drew Gauderman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
