var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    groupRoleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports= Role;