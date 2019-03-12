/**
 * Copyright (C) 2019. Drew Gauderman
 *
 * This source code is licensed under the MIT license found in the
 * README.md file in the root directory of this source tree.
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
  modem(opts, cb) {
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

    //call the callback function
    if (cb) {
      return request(options, cb);
    }

    return new Promise((res, rej) =>
      request(options, (e, r) => {
        if (e) return rej(e);

        //get the json
        const jsonBody = r.body;

        //whmcs returned an api error
        if (jsonBody.error) return rej(jsonBody.error);

        //generally we dont care about all the other details, we just want the data
        if (!opts.raw) {
          //get main keys to figure out how to return the info
          const keys = Object.keys(jsonBody);
          const secondKeys = Object.keys(jsonBody[keys[keys.length - 1]]);

          //skips to the first row values
          if (secondKeys.length === 1) {
            return res(jsonBody[keys[keys.length - 1]][secondKeys[0]]);
          }
        }

        //return the body
        return res(jsonBody);
      })
    );
  }

  //get something
  call(action, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    return this.modem({
      action: action,
      ...opts
    }, cb);
  }

  //get something
  get(action, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    return this.modem({
      action: `Get${action}`,
      ...opts
    }, cb);
  }

  //add something, just an alias for the get function but with "Add" appended to the action
  add(action, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    return this.modem({
      action: `Add${action}`,
      ...opts
    }, cb);
  }

  //update something, just an alias for the get function but with "Update" appended to the action
  update(action, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    return this.modem({
      action: `Update${action}`,
      ...opts
    }, cb);
  }

  //delete something, just an alias for the get function but with "Delete" appended to the action
  delete(action, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    return this.modem({
      action: `Delete${action}`,
      ...opts
    }, cb);
  }
};