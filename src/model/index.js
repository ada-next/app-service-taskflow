const { Model } = require("ada-cloud-util/boost");

class TaskModel extends Model {
    static configure = {
        table: 'task',
        fields: {
            name: "",
            desc: ""
        }
    }
}

module.exports = TaskModel;