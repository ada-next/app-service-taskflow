const { Service } = require("ada-cloud-util/boost");

class TestService extends Service {
    static configure = {
        name: "testService",
        dao: 'mysql',
        methods: {
            test: { transaction: false }
        }
    }

    test() {
        return this.connect.execute('select * from task').then(result => {
            return result[0].map(a => a.id);
        });
    }
}

module.exports = TestService;