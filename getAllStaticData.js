var client = require('./connection.js');
var express = require(`express`);
var app = express();
var port = 3800;
var bkt;
var finalresponse;


//Get Host Data Service
app.use("/getHostData",(req,res) => {

client.search({  
  index: 'hostdata',
  type: 'mydata',
  body: {  

        "_source":["hostwithdiff"]
     },
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            console.log(bkt._source);

            finalresponse = bkt._source;

         });

         }
    
});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send(finalresponse);


});


//Get All Host Data Service
app.use("/getAllHostData",(req,res) => {

client.search({  
  index: 'allhostdata',
  type: 'mydata',
  body: {  

        "_source":["tasks"]
     },
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            console.log(bkt._source);

            finalresponse = bkt._source;

         });

         }
    
});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send(finalresponse);


});


//Get Polygon Data Service
app.use("/getPolygonData",(req,res) => {

client.search({  
  index: 'polygondata',
  type: 'mydata',
  body: {  

        "_source":["host"]
     },
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            console.log(bkt._source);

            finalresponse = bkt._source;

         });

         }
    
});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send(finalresponse);


});


//Get Graph Menu Service
app.use("/getGraphMenu",(req,res) => {

client.search({  
  index: 'graphmenu',
  type: 'mydata',
  body: {  

        "_source":["menu"]
     },
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            console.log(bkt._source);

            finalresponse = bkt._source;

         });

         }
    
});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send(finalresponse);


});


//Get Menu Data Service
app.use("/getMenuData",(req,res) => {

client.search({  
  index: 'menudata',
  type: 'mydata',
  body: {  

        "_source":["menus"]
     },
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

            console.log(bkt._source);

            finalresponse = bkt._source;

         });

         }
    
});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send(finalresponse);


});


app.listen(port,() =>{

   console.log(`Service is listening on port ${port}`);     
}); 