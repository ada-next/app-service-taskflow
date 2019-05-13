const { Controller } = require("ada-cloud-util/boot");

class TextController extends Controller {
    static configure() {
        return {
            basePath: "",
            actions: {
                set: { path: "/set", method: 'get' }
            }
        }
    }

    set({ Service }) {
        return Service.getService('testService').test().then(a => {
            response.body = a;
        }).catch(a => {
            response.body = a;
        });
    }
}

module.exports = TextController;