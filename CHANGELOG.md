# Change Log

All notable changes to the "node-whmcs" module will be documented in this file.

## [1.0.3]

### Added

- You can now pass in a callback function instead of returning a Promise.

## [1.0.2]

### Changed

- Recoded how records are returned. This is a breaking change. With detailed enpoints such as GetClients, you would get a json return with like json.clients.client = array. Now it just returns the array of clients... unless you pass in "raw: true" option.
- Moved LICENSE into README.md. Trying to cleanup.

## [1.0.1]

### Added

- Added and changed "call", "get", "add", "update", "delete" calls. Examples added to readme.

### Changed

- License changed to MIT

### Removed

- Removed examples folder.

## [1.0.0]

- Initial release
