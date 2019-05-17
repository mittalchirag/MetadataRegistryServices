const fs = require('fs');
var elasticClient = require('./esConnection');
var MDR = require('./app/models/mdr');
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/MDR', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Not connected to MDR DB: ' + err);
    } else {
        console.log('Successfully connected to MDR DB');
    }
});

var rawData;
MDR.find({},{'_id':0}).exec(function (err, data) {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log("No data found in MDR DB"); // Return error
    } else {
        rawData= data;
        console.log('Data successfully fetched');
        bulkIndex('mdr', 'medicalData', rawData);
    }
});

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
        bulkBody.push({
            index: {
                _index: 'mdr',
                _type: 'md'
            }
        });

        bulkBody.push(item);
    });

    elasticClient.bulk({ body: bulkBody })
        .then(response => {
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++errorCount, item.index.error);
                }
            });
            
            console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        })
        .catch(console.err);
    elasticClient.indices.putMapping
    return;
};

// function call
const test = function test() {
    const medicalData = JSON.parse(rawData);
    console.log(`${medicalData.length} items parsed from data file`);
    bulkIndex('mdr', 'md', medicalData);
};
