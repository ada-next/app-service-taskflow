const CloudApp = require("ada-cloud-hub/boot");

class Server extends CloudApp {
    getRemoteConfigInfo(service) {
        return service.get('/cloud-config-service/get', {
            path: 'flow-db.json'
        }).then(a => {
            return {
                db: JSON.parse(a).data
            };
        });
    }

    getDatabaseOption() {
        return this.config.db;
    }
}

module.exports = Server;