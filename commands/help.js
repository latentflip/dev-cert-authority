
console.log(`
Dev Cert Authority
------------------
Available commands:
 * install - create the CA certificate, and show instructions for installing it
 * instructions - instructions for how to install the CA cert
 * generate <domain> - create a cert for a domain, use *.example.com for wildcard cert
 * paths <domain> [<type>]
   - list the key/cert paths for a domain that was previously created
   - pass type=(key|crt) for just one type, e.g. \`dev-cert-authority path foo.dev key\`
 * help - this text
`);
