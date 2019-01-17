const http = require('http');
const routes = require('./routes')

// server se kreira i prima funkciju koja ima request respons
// request je ono sto dolazi sa browsera i ima mnooogo podataka izmedju ostalog, klasican http protokol
// respons salje podatke nazad 
const server = http.createServer(routes);

// server listen pali event loop koji osluskuje req res na odredjenom url-u
server.listen(3000);