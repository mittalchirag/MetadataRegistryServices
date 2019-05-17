var bloodTemplate = require('../templates/bloodReport.json');
var ecgTemplate = require('../templates/ecgReport.json');
var MDR = require('../models/mdr');

var fs = require('fs');

var data = undefined;

module.exports = function (router) {


    router.post('/store/data', function (req, res) {
        
        //check type of the Metadata for storing
        if (req.body.type == 'blood') {
            //create a random 32 bit string for file identifier
            var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            req.body._id = id;
            var filename = id + '.json';
            var filePath = 'http://localhost:3032/file/' + filename;
            req.body.url = filePath;
            console.log(req.body);
            data = JSON.stringify(req.body);
            //add the file to the files server
            fs.writeFile('file/' + filename, data, function (err) {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: err.Error
                    });
                } else {
                    //if file is added successfully then
                    //insert the Metadata into the MDR
                    MDR.collection.insertOne(req.body, function (err, result) {
                        if (err) {
                            //return errror
                            res.json({
                                success: false,
                                message: err
                            });
                        }
                        else {
                            //if Metadata is added successfully into the MDR
                            //then return success
                            res.json({
                                success: true,
                                message: 'Metadata stored successfully'
                            });
                        }
                    });
                }
            })

        } else if (req.body.type == 'ecg') {
            res.json({
                success: true,
                message: 'Metadata created successfully'
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid type selected'
            });
        }

    });
    router.get('/store/get', function(req,res){
        res.json(data);
    });


    return router;
};