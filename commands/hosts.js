const AppPaths = require('../paths');
const Fs = require('fs');

module.exports = function () {

  const files = Fs.readdirSync(AppPaths.hostsDir);

  console.log('Certs installed for hosts:');
  console.log(
    files.filter((name) => name.match(/.key$/))
         .map((name) => name.replace(/.key$/, ''))
         .map((name) => AppPaths.denormalizeHost(name))
         .map((name) => `  - ${name}`)
         .join('\n')
  );
};

module.exports();
