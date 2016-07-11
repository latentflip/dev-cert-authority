const UserHome = require('user-home');
const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const configDir = Path.join(UserHome, '.dev-cert-authority');
const hostsDir = Path.join(UserHome, '.dev-cert-authority', 'hosts');
const caKeyPath = `${configDir}/rootCA.key`;
const caPemPath = `${configDir}/rootCA.pem`;

// make dir
Mkdirp.sync(configDir);
Mkdirp.sync(hostsDir);

try {
  Fs.statSync(caKeyPath);
  console.log('CA Already installed');
} catch (err) {

  CP.execSync(`openssl genrsa -out ${caKeyPath} 2048`);
  const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=Dev Cert Authority`;

  CP.execSync(`openssl req -x509 -new -nodes -key ${caKeyPath} -sha256 -days 1024 -out ${caPemPath} -subj "${subj}"`);
}

require('./instructions');
