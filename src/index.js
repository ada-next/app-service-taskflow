const CloudApp = require("cloud-boot");

class Server extends CloudApp {
    getRemoteConfigInfo(service) {
        return service.get('/cloud-config-service/get', {
            path: 'flow-db.json'
        }).then(a => {
            return {
                db: a
            };
        });;
    }
}

module.exports = Server;