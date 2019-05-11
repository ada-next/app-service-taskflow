const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.3.46:27017/flowengine', { useNewUrlParser: true });

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const schema = new Schema({
//     author: ObjectId,
//     title: String,
//     body: String,
//     date: Date
// });

// const conn = mongoose.createConnection('mongodb://192.168.3.46:27017/flowengine', { useNewUrlParser: true });
// const MyModel = conn.model('ModelName', schema);
// const m = new MyModel({title:"aa",body:"body",data:new Date().getTime()});
// m.save(function (err) {
//     if (!err) console.log('Success!');
// }); 
// MyModel.find({}, function (err, docs) {
//     // docs.forEach
//     console.log(docs);

// });
// const path = require("path");
// const { util } = require("./src/lib/mongo/index");

// util.scan(path.resolve(__dirname, "./src/lib/mongo/schema")).then(map => {
//     map['test'].findOne().then(a => console.log(a));
// });

class Test {
    static test = {
        aa: "aa"
    }
};

console.log(Test.test);