var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ['admin','user','staff']},
    dateRegistered: {type: Date, default: Date.now },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

module.exports = Mongoose.model('User', userSchema);

