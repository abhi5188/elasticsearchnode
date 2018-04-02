var client = require('./connection.js');

client.search({  
  index: 'logstash-2018.03.08',
  type: 'doc',
  body: {
    query: {
      match: { "MESSAGE": "Result set 4 Alt A/c Unclaimed" }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      //console.log("--- Response ---");
      //console.log(response);

      //console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        //console.log(hit);
        var rsponsejson = JSON.stringify(hit);

        console.log(rsponsejson);

      })
    }
});