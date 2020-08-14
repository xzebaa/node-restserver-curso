const express = require('express');
const app = express();
const { login } = require('../data/db');

app.get('/health', async (req, resp) => {
    const info = {
        'node-version': process.version,
        memory: process.memoryUsage(),
        pid: process.pid,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        appName: process.env.name,
        appVersion: process.env.npm_package_version,
        hostname: process.env.HOSTNAME,
      };

    return resp.json({
        ok: true,
        info,
    })
})
module.exports = app;