const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost/Contacts');
const loginSchema = new Schema({
   username: {'type':String, 'unique': true, 'required' : true},
    password: {'type':String, 'required' : true}
});

const contactSchema = new Schema({
    contactName: {'type':String, 'unique': true, 'required' : true, index: true},
    phoneNumber: {'type':Number, 'unique': true, 'required' : true},
});

module.exports.login = loginSchema;
module.exports.contact = contactSchema;
module.exports.mongoose = mongoose;
