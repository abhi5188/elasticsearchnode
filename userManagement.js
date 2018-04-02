var client = require('./connection.js');
var express = require(`express`);
var constants = require('./constants.js');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(constants.PropertiesFilePath);
var app = express();
var port = 3700;
var bkt;
var jsonresp = {};
var fs = require("fs");
var finalresponse = [];
var userindex = properties.get('usermanagement.index');
var usertype = properties.get('usermanagement.type');

//Get User List Service
app.use(constants.getUserListURL,(req,res) => {

var data = fs.readFileSync("GetUserListQuery.json", "utf8");
    
client.search({  
  index: userindex,
  type: usertype,
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


//Delete User (using Id) Service
app.use(constants.deleteUserDataURL,(req,res) => {

var data = fs.readFileSync("DeleteUserDataQuery.json", "utf8");

 client.deleteByQuery({
        index: userindex,
        type: usertype,
        body: data
    }, function (error, response) {

        //console.log(response);
        res.status(500);
    });

    res.header(constants.Headers);
    res.send("User deleted successfully !!!");
    res.status(200);

});


//Create User Service
app.use(constants.createUserDataURL,(req,res) => {

var data = fs.readFileSync("CreateUserDataQuery.json", "utf8");    

 client.create({
        index: userindex,
        type: usertype,
        id : 103,
        body: data
    }, function (error, response) {

       console.log(response);
       res.status(500);
    });

    res.header(constants.Headers);
    res.send("User Created Successfully !!!");
    //res.send(response);
    res.status(200);

});


//Update User Service
app.use(constants.updateUserDataURL,(req,res) => {

var data = fs.readFileSync("UpdateUserDataQuery.json", "utf8");       

 client.update({
        index: userindex,
        type: usertype,
        id: 103,
        body: data
    }, function (error, response) {

        console.log(response);
        res.status(500);
    });

    res.header(constants.Headers);
    res.send("User Updated Successfully !!!");
    res.status(200);


});

module.exports.app = app;

app.listen(port,() =>{

   console.log(`User Management service is listening on port ${port}`);     
}); 