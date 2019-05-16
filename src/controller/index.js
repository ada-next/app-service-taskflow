const { Controller } = require("ada-cloud-util/boost");

class TextController extends Controller {
    static configure = {
        basePath: "",
        actions: {
            set: { path: "/set", method: 'get' }
        },
        service: 'testService'
    }

    set() {
        return this.service.test();
    }
}

module.exports = TextController;