var bloodTemplate = require('../templates/bloodReport.json');
var ecgTemplate = require('../templates/ecgReport.json');
var search = require('./search');

var fs= require('fs');

var data = undefined;

module.exports = function (router) {

    router.get("/", (req,res) =>{
        res.send("Hello World");
    });
    router.get("/elastic/ping", function(req, res){
        search.ping(req, res);
    });
    
    router.post("/elastic/index/init", function(req, res){
        // [ 1 ] Create an index
        var index = req.param('index_name');
        search.initIndex(req, res, index);
    });
    
    router.post("/elastic/index/check", function(req, res){
        //  [ 2 ] Check if Index exists
        var index = req.param('index_name');
        search.indexExists(req, res, index);
    });
    
    router.post("/elastic/index/mapping", function(req, res){
        //  [ 3 ] Preparing index and its mapping (basically setting data-types of each attributes and more)
        var payload = req.param('payload');
        var index = req.param('index_name');
        search.initMapping(req, res, index, payload);
        return null;
    });
    
    router.post("/elastic/add", function(req, res){
        //  [ 4 ] Add data to index
        var payload = req.param('payload');
        var index = req.param('index_name');
        var _id = req.param('_id');
        var docType = req.param('type');
        search.addDocument(req, res, index, _id, docType, payload);
        return null; 
    });
    
    router.put("/elastic/update", function(req, res){
        //  [ 5 ] Update a document
        var payload = req.body.payload;
        var index = req.body.index_name;
        var _id = req.body._id;
        var docType = req.param('type');
        search.updateDocument(req, res, index, _id, docType, payload);
        return null; 
    });
    
    router.post("/elastic/search", function(req, res){
        // [ 6 ] Search an index
        var payload = req.body.payload;
        search.search(req, res, payload);
    });
    
    
    // -----------------------DANGER ZONE APIs-------------------
    router.delete("/elastic/delete-document", function(req, res){
        //  Delete a document
        var index = req.param('index_name');
        var _id = req.param('_id');
        var docType = req.param('type');
        search.deleteDocument(req, res, index, _id, docType);
        return null; 
    });
    
    router.delete("/elastic/delete_all", function(req, res){
       // Delete all indexes
       search.deleteAll(req, res);
    });

    
    return router;
};