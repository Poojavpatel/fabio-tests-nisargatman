const devConfig = require('./dev');

let config = {};
switch (process.env.APP_ENV) {
  case "dev":
    config = devConfig;
    break;
  default:
    config = devConfig;
    break;
}

module.exports = config;