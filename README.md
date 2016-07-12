# 💚🔒 Dev Cert. Authority

Sometimes you need/want to run services locally with https. You can do this with self-signed certs, but it's annoying as you have to constantly force your browser to accept them, and if they're api services, sometimes ssl failures can cause ajax requests to confusingly fail.

This module makes it really easy to create your own certificate authority, and sign proper certificates using it.


## Installation process (do this once)

To install the CA, you have to generate it's certificates, and install them in your OS.

1. `npm install -g dev-cert-authority` - install the module globally with npm
2. `dev-cert-authority install` - creates a cert in `~/.dev-cert-authority`
3. Follow the instructions to install the cert in your OS


## Generating a certificate for a domain

Say you want to run a service locally on the domain: `awesomeapp.dev`, you need to do three things:

### 1. Configure `/etc/hosts` or similar, to point the domain `awesomeapp.dev to `localhost`

On OSX/linux this typically involves adding the following line to `/etc/hosts`

```
127.0.0.1 awesomeapp.dev
```


### 2. Generate a certificate

If you use the node module in step 3, you can skip this step as it will be created for you automatically.

In your terminal run `dev-cert-authority generate awesomeapp.dev` to create a signed certificate for the domain

To create a wildcard cert for any subdomain of `awesomeapp.dev`, use: `dev-cert-authority generate \*.awesomeapp.dev`


### 3. Use the certificate in your application

The app will now have created two files in the `~/.dev-cert-authority/hosts` directory, which you can use in your application:

* the `.key` key file
* the `.crt` cert file

Depending on your server/http framework, you will use these files in different ways.

> Note: you can use the `paths/path` command to get the location of the files in bash, for example: `dev-cert-authority path awesomeapp.dev key` returns the location of the `.key` file for the awesomeapp.dev domain


#### node.js

From node, you can require the node module, to load the certificates for you in a format that node's http server expects, for example:

```javascript
// node's built in https server:

const https = require('https');
const tlsOptions = require('dev-cert-authority')('awesomeapp.dev');

var server = https.createServer(tlsOptions);


// express:

const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

https.createServer(tlsOptions, app)
     .listen(55555);


// hapi

'use strict';

const Hapi = require('hapi');
const tlsOptions = require('dev-cert-authority')('awesomeapp.dev');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
  tls: tlsOptions
});
```


#### webpack

The `webpack-dev-server` can be configured to use https using the `--https`, `--key`, `--cert` options. This can be combined with the `paths` command like so:

```sh
webpack-dev-server --https --key $(dev-cert-authority path awesomeapp.dev key) --cert $(dev-cert-authority path awesomeapp.dev cert)
```


## IMPORTANT: Security Implications

Installing a self-signed CA cert at the OS level has a potential security implication - if someone was to get ahold of that CA cert, they could generate certs for real domains and use it to MITM you on real domains.

Considerations:

* **NEVER USE THIS IN PRODUCTION** you should never be asking anyone else to install your CA certs, and the certs you generate should only be used for development.
* Don't share your CA cert or domain certs with anybody else. There's no need to copy certs into repos for shared projects, as the `dev-cert-authority` commands will pick up each user's own certs.
* Where possible, avoid generating certificates, and adding `/etc/hosts` entries for "real" domains. I would suggest using something like `.test` or `.dev` domains for development (though apparently google bought `.dev`, sigh).

# License

MIT
