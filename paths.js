const UserHome = require('user-home');
const Path = require('path');
const Fs = require('fs');

const Paths = {
  configDir: Path.join(UserHome, '.dev-cert-authority'),
  hostsDir: Path.join(UserHome, '.dev-cert-authority', 'hosts'),
};

Paths.caKeyPath = `${Paths.configDir}/rootCA.key`;
Paths.caPemPath =  `${Paths.configDir}/rootCA.pem`;

Paths.normalizeHost = function (host) {
  return host.replace(/^\*\./, 'wild.');
};

Paths.denormalizeHost = function (host) {
  return host.replace(/^wild\./, '*.');
};

Paths.makeCertPaths = function (host) {

  host = Paths.normalizeHost(host);

  return {
    key: `${Paths.hostsDir}/${host}.key`,
    csr: `${Paths.hostsDir}/${host}.csr`,
    crt: `${Paths.hostsDir}/${host}.crt`
  };
};

Paths.certExists = function (host) {

  try {
    Fs.statSync(Paths.makeCertPaths(host).key);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = Paths;
