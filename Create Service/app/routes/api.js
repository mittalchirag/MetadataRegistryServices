var bloodTemplate = require('../templates/bloodReport.json');
var ecgTemplate = require('../templates/ecgReport.json');

var fs= require('fs');

var data = undefined;

module.exports = function (router) {


    router.post('/create/template', function(req,res){
        //check the type of the template requested 
        //return the corresponding template
        
        if(req.body.type == 'blood'){
            res.json({
                success: true,
                template: bloodTemplate
            });
        }else if(req.body.type == 'ecg'){
            res.json({
                success: true,
                template: ecgTemplate
            });
        }else{
            res.json({
                success: false,
                message: 'Invalid type selected'
            });
        }
    });

    router.post('/create/getdata', function(req,res){
        console.log(req.body);
        data = req.body;
        
        
        if(req.body.type == 'blood'){
            res.json({
                success: true,
                message: 'Metadata created successfully'
            });
        }else if(req.body.type == 'ecg'){
            res.json({
                success: true,
                message: 'Metadata created successfully'
            });
        }else{
            res.json({
                success: false,
                message: 'Invalid type selected'
            });
        }
        
    });

    router.get('/create/get', function(req,res){
        res.json(data);
    })
    return router;
};