const { Model } = require("ada-cloud-util/boost");

class TaskModel extends Model {
    static configure = {
        table: 'task',
        fields: {
            id: { prime: true },
            name: { type: String },
            desc: { type: String }
        }
    }
}

module.exports = TaskModel;