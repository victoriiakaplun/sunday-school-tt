'use strict';
const HttpStatus = require('http-status-codes');

async function adminRootCheck(ctx, next) {
    if (ctx.state.user.role === 'admin') {
        await next();
    } else {
        ctx.response.status = HttpStatus.BAD_REQUEST;
        ctx.response.body = 'No admin root';
        return ctx.response;
    }
}

module.exports = { adminRootCheck };
