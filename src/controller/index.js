const { Controller } = require("ada-cloud-util/boost");

class TextController extends Controller {
    static configure = {
        basePath: "",
        actions: {
            set: { path: "/set", method: 'get' }
        }
    }

    set({ Service }) {
        return Service.getService('testService').test();
    }
}

module.exports = TextController;