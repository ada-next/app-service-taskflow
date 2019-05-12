const Server = require("./src/index");
const router = require("./src/router");
const { Boost, Service } = require("./helper/sql");
const Path = require("path");

let server = new Server();
server.use(router.routes());
server.on('configchange', () => {
    let { db } = server.config;
    Boost.update(db);
});
server.on('started', () => {
});
server.startup(({ context, config }) => {
    context.Service = Service;
    return Boost.scan(Path.relative(__dirname, "./src"), config.db);
});