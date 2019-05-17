// import the template and create schema
// this is the schema for blood-test report
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let reportSchema = new Schema({
    _id: Number,
    age: Number,
    gender: String,
    tests: {
        "0": {
            "name": String,
            "count": Number,
            "specs": {
                "0": {
                    "name": String,
                    "count": Number
                },
                "1": {
                    "name": String,
                    "count": Number
                },
                "2": {
                    "name": String,
                    "count": Number
                },
                "3": {
                    "name": String,
                    "count": Number
                },
                "4": {
                    "name": String,
                    "count": Number
                }
            }
        },
        "1": {
            "name": String,
            "count": Number,
            "specs": {
                "0": {
                    "name": String,
                    "count": Number
                }
            }
        },
        "2": {
            "name": String,
            "count": Number
        },
        "3": {
            "name": String,
            "count": Number
        },
        "4": {
            "name": String,
            "count": Number
        },
        "5": {
            "name": String,
            "count": Number
        },
        "6": {
            "name": String,
            "count": Number
        },
        "7": {
            "name": String,
            "count": Number
        },
        "8": {
            "name": String,
            "count": Number
        },
        "9": {
            "name": String,
            "count": Number
        },
        "10": {
            "name": String,
            "count": Number
        },
        "11": {
            "name": String,
            "count": Number
        },
        "12": {
            "name": String,
            "count": Number
        }
    },
    title: String,
    url: String,
    author: String
    

}, ({_id: false}));

module.exports = mongoose.model('bloodReport', reportSchema);