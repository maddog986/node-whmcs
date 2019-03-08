/**
 * Copyright (C) 2019. Drew Gauderman
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const request = require('request');

//export the sonar class
module.exports = class WHMCS {
  //class startup
  constructor(opts) {
    //require host, username, password
    ['host', 'identifier', 'secret'].forEach(name => {
      if (!opts.hasOwnProperty(name)) {
        throw new Error('options.' + name + ' is a required argument.');
      }
    });

    this.opts = {
      endpoint: 'includes/api.php',
      ...opts
    };
  }

  //request that returns a promise
  modem(opts) {
    let options = {
      uri: `https://${this.opts.host}/${this.opts.endpoint}`,
      method: opts.method || 'POST',
      qs: {
        identifier: this.opts.identifier,
        secret: this.opts.secret,
        responsetype: opts.responsetype || 'json',
        ...opts
      },
      json: true
    };

    return new Promise((res, rej) =>
      request(options, (e, r) => {
        if (e) return rej(e);

        //whmcs returned an api error
        if (r.body.error) return rej(r.body.error);

        //generally we dont care about all the other details, we just want the data
        if (!opts.raw) {
          //get main keys to figure out how to return the info
          const keys = Object.keys(r.body);
          const secondKeys = Object.keys(r.body[keys[keys.length - 1]]);

          //skips to the first row values
          if (secondKeys.length === 1) {
            return res(r.body[keys[keys.length - 1]][secondKeys[0]]);
          }
        }

        //return the body
        return res(r.body);
      })
    );
  }

  //get something
  call(action, opts = {}) {
    return this.modem({
      action: action,
      ...opts
    });
  }

  //get something
  get(action, opts = {}) {
    return this.modem({
      action: `Get${action}`,
      ...opts
    });
  }

  //add something, just an alias for the get function but with "Add" appended to the action
  add(action, opts = {}) {
    return this.modem({
      action: `Add${action}`,
      ...opts
    });
  }

  //update something, just an alias for the get function but with "Update" appended to the action
  update(action, opts = {}) {
    return this.modem({
      action: `Update${action}`,
      ...opts
    });
  }

  //delete something, just an alias for the get function but with "Delete" appended to the action
  delete(action, opts = {}) {
    return this.modem({
      action: `Delete${action}`,
      ...opts
    });
  }
};
