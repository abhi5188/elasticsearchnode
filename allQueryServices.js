var client = require('./connection.js');
var express = require(`express`);
var constants = require('./constants.js');
var fs = require("fs");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(constants.PropertiesFilePath);
var app = express();
var port = 3200;
var bkt;
var jsonresp = {};
var resultjson = {};
var i = 0;

var index = properties.get('elasticsearch.index');
var type = properties.get('elasticsearch.type');

//Service to get all the distinct threads in the logs
app.use(constants.getDistinctThreadURL,(req,res) => {           

var data = fs.readFileSync("GetDistinctThreads.json", "utf8");

client.search({
    
    index: index,
    type: type,
    body: data
    
    },function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

         //console.log(response);

         var parsedData = JSON.parse(JSON.stringify(response.aggregations));

         bkt = parsedData.distinct_threads.buckets;

         bkt.forEach(function(bkt) {
    
         //console.log(bkt.key);

         });
    }
    
});

    res.header(constants.Headers);
    jsonresp["thread"] = bkt;
    res.send(jsonresp);
    res.status(200);


});


//Service to get classname based on the threadname
app.use(constants.getClassNameURL,(req,res) => {

var data = fs.readFileSync("GetClassNameBasedOnThreadName.json", "utf8");

var querystring = JSON.parse(data);

querystring.query.match.THREADNAME = req.params.threadName;

//console.log(querystring);

client.search({  
  
    index: index,
    type: type,
    body: querystring

},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

      //console.log("Response >>>>>>"+JSON.stringify(response));  

      var parsedData = JSON.parse(JSON.stringify(response.hits));

      bkt = parsedData.hits;

      bkt.forEach(function(bkt) {
    
      //console.log(bkt._source.CLASSNAME);

      });
    }
    
});
    res.header(constants.Headers);
    res.send(JSON.stringify(bkt));
    res.status(200);
});


//Service to get all distinct log type
app.use(constants.getDistinctLogTypeURL,(req,res) => {

var data = fs.readFileSync("GetDistinctLogType.json", "utf8");    

client.search({  
  
    index: index,
    type: type,
    body: data

},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

         //console.log("Response >>>>>>"+JSON.stringify(response));  

         var parsedData = JSON.parse(JSON.stringify(response.aggregations));

         bkt = parsedData.distinct_logtype.buckets;

         bkt.forEach(function(bkt) {
    
        // console.log(bkt.key);

        });
    }
    
});
    res.header(constants.Headers);
    res.send(JSON.stringify(bkt));
    res.status(200);
});


//Service to get method name based on thread name
app.use(constants.getMethodNameURL,(req,res) => {

var data = fs.readFileSync("GetMethodNameBasedOnThreadName.json", "utf8");

var querystring = JSON.parse(data);

querystring.query.match.THREADNAME = req.params.threadName;     

client.search({  
  
    index: index,
    type: type,
    body: querystring

},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

      //console.log("Response >>>>>>"+JSON.stringify(response));    

      var parsedData = JSON.parse(JSON.stringify(response.hits));

      bkt = parsedData.hits;

      bkt.forEach(function(bkt) {
    
      //console.log(bkt._source.METHODNAME);

        });
    }
    
});
    res.header(constants.Headers);
    res.send(JSON.stringify(bkt));
    res.status(200);
});


//Service to get the document based on thread name
app.use(constants.getDocumentOnThreadNameURL ,(req, res) => {

var data = fs.readFileSync("GetDocumentsBasedOnThreadName.json", "utf8"); 

var querystring = JSON.parse(data);  

querystring.query.bool.filter.terms.THREADNAME = req.params.threadName; 

client.search({  
  
    index: index,
    type: type,
    body: querystring

},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

      //console.log("Response >>>>>>"+JSON.stringify(response));    

      var parsedData = JSON.parse(JSON.stringify(response.hits));

      bkt = parsedData.hits;

      bkt.forEach(function(bkt) {
    
      console.log(bkt._id);

      });
    }
    
});
    res.header(constants.Headers);
    res.send(JSON.stringify(bkt));
    res.status(200);

});


//Commented query
// {
//   "query" : {
//     "bool" : {
//       "filter" : {
//         "terms" : {
//           "THREADNAME.keyword" : [SYSTEM#GLEPRD, Thread-425620]
//         }
//       }
//     }
//   }
// }


//Service for getting thread between a range
app.post(constants.getThreadBetweenRangeURL,(req,res) => {

var data = fs.readFileSync("GetThreadBasedOnRange.json", "utf8");   

var querystring = JSON.parse(data);

querystring.query.range.timestamp.gte = req.params.gte; 

querystring.query.range.timestamp.lte = req.params.lte;

console.log("<<<<<<<<<<<"+JSON.stringify(querystring)+">>>>>>>>>");

client.search({  
  
    index: index,
    type: type,
    body: querystring

},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

        //console.log("<>><<>>Response : "+JSON.stringify(response));

        var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            //console.log(bkt._source.THREADNAME);

            resultjson[i] = bkt._source.THREADNAME;

            i++; 

         });    

    }
    
});
    res.header(constants.Headers);
    res.send(JSON.stringify(resultjson));
    res.status(200);
});

module.exports.app = app;


app.listen(port,() =>{

  // console.log(`Service is listening on port ${port}`);     
}); 