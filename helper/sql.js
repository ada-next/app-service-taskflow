const { File } = require("ada-util");
const Path = require("path");

class Dao {
    getConnect() { }

    updateConfig(config) {
    }
}

class Service {
    constructor() {
        this._connection = null;
    }

    static getService(serviceName) {
        let mapInfo = ServiceMap.get(serviceName);
        if (mapInfo) {
            let { targetClass, dao, methods = {} } = mapInfo;
            let targetInstance = new targetClass();
            dao = DaoMap.get(dao);
            return new Proxy(targetInstance, {
                get(target, name) {
                    if (typeof target[name] === 'function') {
                        let { transaction = false } = methods[name] || {};
                        return (args) => {
                            return dao.getConnect().then(connection => {
                                target._connection = connection;
                                let ps = Promise.resolve();
                                if (transaction) {
                                    ps = ps.then(() => new Promise((resolve, reject) => {
                                        connection.beginTransaction(err => {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                resolve();
                                            }
                                        });
                                    }));
                                }
                                return ps.then(() => {
                                    if (!args) {
                                        args = [];
                                    }
                                    return Promise.resolve().then(() => target[name].apply(target, args)).then(a => {
                                        if (transaction) {
                                            connection.commit();
                                        }
                                        return a;
                                    }).catch(err => {
                                        if (transaction) {
                                            connection.rollback();
                                        }
                                        return err;
                                    }).finally(a => {
                                        target._connection = null;
                                        dao.pool.releaseConnection(connection);
                                        return a;
                                    });
                                });
                            });
                        }
                    } else {
                        return target[name];
                    }
                }
            });
        } else {
            return null;
        }
    }

    get connect() {
        return this._connection;
    }
}

const DaoMap = {
    map: new Map(),
    get(type) {
        return this.map.get(type);
    },
    set(clazz, option) {
        if (clazz.configure) {
            let config = clazz.configure();
            if (config.name) {
                this.map.set(config.name, new clazz(option));
            }
        }
    }
}

const ServiceMap = {
    map: new Map(),
    get(name) {
        return this.map.get(name);
    },
    set(clazz) {
        if (clazz.configure) {
            let config = clazz.configure();
            if (config.name) {
                config.targetClass = clazz;
                this.map.set(config.name, config);
            }
        }
    }
}

const Boost = {
    scan(sourcePath, option) {
        return new File(sourcePath).getAllSubFilePaths().then(paths => {
            paths.filter(path => Path.extname(path) === ".js").forEach(path => {
                let clazz = require(path);
                if (clazz.prototype instanceof Service) {
                    ServiceMap.set(clazz);
                } else if (clazz.prototype instanceof Dao) {
                    DaoMap.set(clazz, option);
                }
            });
        });
    },
    update(config) {
        DaoMap.map.forEach(dao => dao.updateConfig(config));
    }
}

module.exports = {
    Service,
    Dao,
    Boost
};