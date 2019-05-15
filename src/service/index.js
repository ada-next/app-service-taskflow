const { Service } = require("ada-cloud-util/boost");
const TaskModel = require("./../model/index");

class TestService extends Service {
    static configure = {
        name: "testService",
        dao: {
            dao: 'mysql'
        },
        methods: {
            test: { transaction: false }
        }
    }

    test(id) {
        let task = new TaskModel({ id });
        return this.dao.find(task);
    }
}

module.exports = TestService;