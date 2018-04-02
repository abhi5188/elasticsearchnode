var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();

var port = 3100;


app.use("/", (req,res) =>{

    res.send('<h1>I am connected to elasticsearch !!!<h1>');

    var client = new elasticsearch.Client({
    hosts: [ 'localhost:9200']
});

    console.log("Connected to elasticsearch");

    client.ping({
     requestTimeout: 30000,
    }, function(error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('Everything is ok');
        }
    });
});


app.get("/fireElasticQuery", () => {

    client.search({
    index: 'blog',
    type: 'posts',
    body: {
        query: {
            match: {
                "PostName": 'Node.js'
            }
        }
    }
}).then(function(resp) {
    console.log(resp);
}, function(err) {
    console.trace(err.message);
});

});

app.listen(port, () => {

    console.log(`Server is listening on port: ${port}`);
});