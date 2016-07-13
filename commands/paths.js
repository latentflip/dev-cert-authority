const AppPaths = require('../paths');
const Log = require('../log');

module.exports = function (domain, path) {

  if (!AppPaths.certExists(domain)) {

    Log.warn(`Cert for ${domain} has not been created`);
    Log.warn(`You can create one with: 'dev-cert-authority generate ${domain}'`);
    return process.exit(1);
  }

  const certPaths = AppPaths.makeCertPaths(domain);

  if (path === 'key') {
    console.log(certPaths.key);
  } else if (path === 'cert' || path === 'crt') {
    console.log(certPaths.crt);
  } else {
    console.log(`\nCert paths for ${domain}:`);
    console.log(` 🔑  key: ${certPaths.key}`);
    console.log(` 📄  crt: ${certPaths.crt}`);
  }
};
