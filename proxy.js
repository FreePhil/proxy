const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const target = 'http://203.116.17.9'; // Replace with the URL of the CORS-disabled web server

// Handle preflight requests
app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range'
    );
    res.sendStatus(200);
});

// Proxy requests to the target server
app.all('/*', (req, res) => {
    proxy.web(req, res, { target });
});

// Add CORS headers to the response
proxy.on('proxyRes', (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
});

// Start the server
app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});