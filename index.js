const Server = require("./src/index");
const router = require("./src/router");
const mysql = require('mysql2');

let server = new Server();
server.use(router.routes());
server.on('configchange', () => {
    let { db } = server.config;
    server.context.pool = mysql.createPool(db);
});
server.on('started', () => {
});
server.startup(({ context, config }) => {
    let { db } = config;
    context.pool = mysql.createPool(db);
    context.getConnection = () => {
        return context.pool.promise();
    }
});