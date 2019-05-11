const CloudApp = require("ada-cloud-boot");

class Server extends CloudApp {
    getRemoteConfigInfo(service) {
        return service.get('/cloud-config-service/get', {
            path: 'flow-db.json'
        }).then(a => {
            return {
                db: JSON.parse(a).data
            };
        });;
    }
}

module.exports = Server;