const Server = require("./src/index");

let server = new Server();
server.on('started', () => {
});
server.startup();