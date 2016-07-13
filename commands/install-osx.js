const CP = require('child_process');
const Log = require('../log');

module.exports.canAutoInstall = function () {
  try {
    CP.execSync('command -v security');
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.autoInstall = function (path) {
  if (!module.exports.canAutoInstall()) {
    return false;
  }

  try {
    const keychain = CP.execSync('security login-keychain').toString().trim();
    Log.wait('Attempting to install in keychain, enter your password if asked');
    CP.execSync(`security add-trusted-cert -k ${keychain} ${path}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
