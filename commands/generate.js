const signCert = require('../sign-cert');

module.exports = function (domain) {
  signCert(domain);
  console.log(`Cert for ${domain} created:`);
  require('./paths')(domain);
};
