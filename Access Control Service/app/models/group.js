var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema= new Schema({
    groupName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Editor', 'Publisher', 'Author', 'Reader'],
        required: true
    }
});


module.exports = mongoose.model('Group', GroupSchema);;