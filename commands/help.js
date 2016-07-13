const colors = require('colors');
const b = (str) => str.bold;

module.exports = function () {
  console.log(`
${b('Dev Cert Authority')}
------------------
Available commands:

 * ${b('install')} - create the CA certificate, and show instructions for installing it
 * ${b('instructions')} - instructions for how to install the CA cert
 * ${b('generate <domain>')} - create a cert for a domain, use *.example.com for wildcard cert
 * ${b('remove <domain>')} - remove a cert for a domain, use *.example.com for wildcard cert
 * ${b('hosts')}, ${b('domains')} - list installed certs
 * ${b('paths <domain> [<type>]')}
   - list the key/cert paths for a domain that was previously created
   - pass type=(key|crt) for just one type, e.g. \`dev-cert-authority path foo.dev key\`
 * ${b('help')} - this text
`);
};
