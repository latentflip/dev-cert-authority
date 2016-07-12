const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const AppPaths = require('../paths');


// make dir
Mkdirp.sync(AppPaths.configDir);
Mkdirp.sync(AppPaths.hostsDir);

try {
  Fs.statSync(AppPaths.caKeyPath);
  console.log('CA cert already exists, may not be installed.');
} catch (err) {

  console.log('Creating CA cert');

  CP.execSync(`openssl genrsa -out ${AppPaths.caKeyPath} 2048`);
  const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=Dev Cert Authority`;

  CP.execSync(`openssl req -x509 -new -nodes -key ${AppPaths.caKeyPath} -sha256 -days 1024 -out ${AppPaths.caPemPath} -subj "${subj}"`);
}

require('./instructions');
