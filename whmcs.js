/**
 * node-whmcs
 * Copyright (C) 2019. Drew Gauderman

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
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

    return new Promise((res, rej) => request(options, (e, r) => (e ? rej(e) : r.body.error ? rej(r.body.error) : res(r.body))));
  }

  //get something
  get(action, opts = {}) {
    return this.modem({
      action: action,
      ...opts
    });
  }
};