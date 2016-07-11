const UserHome = require('user-home');
const Mkdirp = require('mkdirp');
const Path = require('path');
const CP = require('child_process');
const Fs = require('fs');

const configDir = Path.join(UserHome, '.dev-cert-authority');
const hostsDir = Path.join(UserHome, '.dev-cert-authority', 'hosts');
const caKeyPath = `${configDir}/rootCA.key`;
const caPemPath = `${configDir}/rootCA.pem`;


module.exports = function (host) {
  const hostPathPart = host.replace(/\*/g, 'wild');

  const certKeyPath = `${hostsDir}/${hostPathPart}.key`;
  const certCsrPath = `${hostsDir}/${hostPathPart}.csr`;
  const certCrtPath = `${hostsDir}/${hostPathPart}.crt`;

  const subj = `/C=US/ST=AK/L=Anchorage/O=npm-dev-cert-authority/OU=npm-module/CN=${host}`;

  try {
    Fs.statSync(certKeyPath);
  } catch (err) {
    CP.execSync(`openssl genrsa -out ${certKeyPath} 2048`);
    CP.execSync(`openssl req -new -key ${certKeyPath} -out ${certCsrPath} -subj "${subj}"`);
    CP.execSync(`openssl x509 -req -in ${certCsrPath} -CA ${caPemPath} -CAkey ${caKeyPath} -CAcreateserial -out ${certCrtPath} -days 500 -sha256`);
    CP.execSync(`rm ${certCsrPath}`);
  }

  return {
    key: Fs.readFileSync(certKeyPath),
    cert: Fs.readFileSync(certCrtPath)
  };
};
