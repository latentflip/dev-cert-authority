const Fs = require('fs');

const Log = require('../log');
const AppPaths = require('../paths');

const remove = function (path) {
  try {
    Fs.unlinkSync(path);
    Log.ok(`Removed ${path}`);
  } catch (err) {
    if (err.message.match(/ENOENT/)) {
      return;
    }
    Log.warn(`Error removing ${path}: ${err.message}`);
  }
};

module.exports = function (host) {
  if (!AppPaths.certExists(host)) {
    Log.warn(`Certificate for ${host} does not exist`);
    return;
  }

  Log.wait(`Removing cert files for ${host}`);
  const certPaths = AppPaths.makeCertPaths(host);
  remove(certPaths.key);
  remove(certPaths.csr);
  remove(certPaths.crt);
};
