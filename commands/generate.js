const SignCert = require('../sign-cert');
const Log = require('../log');

module.exports = function (domain) {
  SignCert(domain);
  require('./paths')(domain);
};
