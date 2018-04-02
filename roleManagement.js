var client = require('./connection.js');
var express = require(`express`);
var constants = require('./constants.js');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(constants.PropertiesFilePath);
var app = express();
var fs = require("fs");
var port = 3600;
var bkt;
var finalresponse = [];
var jsonresp = {};

var roleindex = properties.get('rolemanagement.index');
var roletype = properties.get('rolemanagement.type');

//Get Roles List Service
app.get(constants.getRoleListURL,(req,res) => {

var data = fs.readFileSync("GetRoleListQuery.json", "utf8");

client.search({  
  index: roleindex,
  type: roletype,
  body: data
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
      res.status(500);
    }
    else {

        //console.log(response);

         var parsedData = JSON.parse(JSON.stringify(response.hits));

         bkt = parsedData.hits;

         bkt.forEach(function(bkt) {

             console.log(bkt);

            //console.log(bkt._source);

            finalresponse.push(JSON.stringify(bkt._source));

            //console.log(finalresponse);

         });

         }
    
});
    res.header(constants.Headers);
    res.status(200);
    //jsonresp['thread'] = JSON.parse(finalresponse);
    res.send(finalresponse);
    console.log(finalresponse);

});


//Delete Role (using Id) Service
app.use(constants.deleteRoleDataURL,(req,res) => {

var data = fs.readFileSync("DeleteRoleDataQuery.json", "utf8");    

 client.deleteByQuery({
        index: roleindex,
        type: roletype,
        body: data
    }, function (error, response) {

       console.log(response);
       res.status(500);
    });

    res.header(constants.Headers);
    //res.send(response);
    res.status(200);


});


//Create Role Service
app.use(constants.createRoleDataURL,(req,res) => {

var data = fs.readFileSync("CreateRoleDataQuery.json", "utf8");    

 client.create({
        index: roleindex,
        type: roletype,
        id : 103,
        body: data
    }, function (error, response) {

        //console.log(response);
        res.status(500);
    });

    res.header(constants.Headers);
    res.send("Role Created Successfully !!!");
    res.status(200);

});


//Create Role Service
app.use(constants.updateRoleData,(req,res) => {
    var data = fs.readFileSync("UpdateRoleDataQuery.json", "utf8");    

 client.update({
        index: roleindex,
        type: roletype,
        id:101,
        body: data
        
    }, function (error, response) {

       // console.log(response);
       res.status(500);
    });

    res.header(constants.Headers);
    res.send("Role Updated Successfully !!!");
    res.status(200);

});

module.exports.app = app;

app.listen(port,() =>{

   console.log(`Service is listening on port ${port}`);     
}); 