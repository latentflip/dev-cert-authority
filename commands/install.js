const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const AppPaths = require('../paths');
const InstallOSX = require('./install-osx');
const Log = require('../log');

module.exports = function () {
  // make dir
  Mkdirp.sync(AppPaths.configDir);
  Mkdirp.sync(AppPaths.hostsDir);

  try {
    Fs.statSync(AppPaths.caKeyPath);
    Log.ok('CA cert already exists, may not be installed in your OS though');
  } catch (err) {

    Log.ok('Creating CA cert');

    CP.execSync(`openssl genrsa -out ${AppPaths.caKeyPath} 2048`);
    const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=Dev Cert Authority`;

    CP.execSync(`openssl req -x509 -new -nodes -key ${AppPaths.caKeyPath} -sha256 -days 1024 -out ${AppPaths.caPemPath} -subj "${subj}"`);
  }


  if (InstallOSX.autoInstall(AppPaths.caPemPath)) {
    Log.success('Cert installed in your keychain, you\'re all set!')
  } else {
    Log.warn('Could not automatically install cert, follow these steps yourself');
    require('./instructions');
  }
};
