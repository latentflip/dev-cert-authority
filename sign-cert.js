const UserHome = require('user-home');
const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const AppPaths = require('./paths');

module.exports = function (host) {

  const certPaths = AppPaths.makeCertPaths(host);

  const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=${host}`;

  try {
    Fs.statSync(certPaths.key);
  } catch (err) {
    CP.execSync(`openssl genrsa -out ${certPaths.key} 2048`);
    CP.execSync(`openssl req -new -key ${certPaths.key} -out ${certPaths.csr} -subj "${subj}"`);
    CP.execSync(`openssl x509 -req -in ${certPaths.csr} -CA ${AppPaths.caPemPath} -CAkey ${AppPaths.caKeyPath} -CAcreateserial -out ${certPaths.crt} -days 500 -sha256`);
    CP.execSync(`rm ${certPaths.csr}`);
  }

  return {
    key: Fs.readFileSync(certPaths.key),
    cert: Fs.readFileSync(certPaths.crt)
  };
};
