var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessSchema = new Schema({
    groupRoleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    },
    itemType: {
        type: String,
        required: true
    },
    create : {
        type: Boolean,
        required: true
    },
    read : {
        type: Boolean,
        required: true
    },
    update : {
        type: Boolean,
        required: true
    },
    delete : {
        type: Boolean,
        required: true
    }
});



const AccessControlList = mongoose.model('ACL', AccessSchema);

module.exports= AccessControlList;