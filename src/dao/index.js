const mysql = require('mysql2');
const { Dao } = require("ada-cloud-util/boot");

class MySqlDao extends Dao {
    constructor(option) {
        super();
        this.pool = mysql.createPool(option);
    }

    static configure() {
        return { name: 'mysql' };
    }

    getConnect() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    reject();
                } else {
                    resolve(conn.promise());
                }
            });
        });
    }

    updateDatabse(config) {
        this.pool.end(err => {
            this.pool = mysql.createPool(config);
        });
    }
}

module.exports = MySqlDao;