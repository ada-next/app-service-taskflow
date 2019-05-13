const Path = require("path");
const Server = require("./src/index");
const { Booster, Service } = require("ada-cloud-util/boot");

let server = new Server();
server.on('configchange', () => {
    let { db } = server.config;
    Booster.updateDatabase(db);
});
server.on('started', () => {
});
server.startup(({ context, config }) => {
    context.Service = Service;
    return Booster.boot({
        source: Path.relative(__dirname, "./src"),
        database: config.db,
        koa: server
    });
});