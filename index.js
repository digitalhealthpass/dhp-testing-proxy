const http = require('http');
const httpProxy = require('http-proxy');

const verifierConfig = require('./verifier-config.json');

const proxy = httpProxy.createProxyServer({});

const port = 3000

http.createServer(function (req, res) {
    if (req.url.includes('/hpass/')) {
        proxy.web(req, res, {
            target: 'http://127.0.0.1:3010'
          });
          return;
    }
    if (req.url.includes('/verifier/')) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(verifierConfig));
        return;
    }
    if (req.url.includes('/metering/')) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end('ok');
        return;
    }
    res.writeHead(404);
    res.end('Route not found');
}).listen(port);