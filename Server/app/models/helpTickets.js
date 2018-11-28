var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var HelpTicketContentSchema = new Schema({
    personId: { type: Schema.Types.ObjectID },
    content: { type: String },
    dateCreated: { type: Date, default: Date.now },
    helpTicketId: {type: Schema.Types.ObjectID },
    file: {
        fileName: { type: String },
        originalFileName: { type: String }
    }
});

module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
    title: { type: String },
    personId: { type: Schema.Types.ObjectID },
    ownerId: { type: Schema.Types.ObjectId },
    status: { type: String, enum: ['new', 'inProcess', 'closed'] },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);