const UserHome = require('user-home');
const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const AppPaths = require('./paths');

const Log = require('./log');

module.exports = function (host) {

  Mkdirp.sync(AppPaths.hostsDir);

  const certPaths = AppPaths.makeCertPaths(host);

  const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=${host}`;

  try {
    Fs.statSync(certPaths.key);
    Log.ok(`Cert for ${host} already exists`);
  } catch (err) {
    Log.wait(`Generating certificates for ${host}`);
    CP.execSync(`openssl genrsa -out ${certPaths.key} 2048 2>/dev/null`);
    CP.execSync(`openssl req -new -key ${certPaths.key} -out ${certPaths.csr} -subj "${subj}" 2>/dev/null`);
    CP.execSync(`openssl x509 -req -in ${certPaths.csr} -CA ${AppPaths.caPemPath} -CAkey ${AppPaths.caKeyPath} -CAcreateserial -out ${certPaths.crt} -days 500 -sha256 2>/dev/null`);
    CP.execSync(`rm ${certPaths.csr}`);
    Log.success(`Cert for ${host} created!`);
  }

  return {
    key: Fs.readFileSync(certPaths.key),
    cert: Fs.readFileSync(certPaths.crt)
  };
};
