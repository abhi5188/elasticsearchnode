var sql = require("mssql");

var dbConfig = {
    server: "172.29.176.20",
    database: "ElasticDB",
    user: "CICD",
    password: "cicd123",
    port: 1521
};

function getEmp() {
    var conn = new sql.ConnectionPool(dbConfig);
    
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT * FROM emp").then(function (recordset) {
            console.log(recordset);
            conn.close();
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });        
    })
    .catch(function (err) {
        console.log(err);
    });

    //--> another way
    //var req = new sql.Request(conn);
    //conn.connect(function (err) {
    //    if (err) {
    //        console.log(err);
    //        return;
    //    }
    //    req.query("SELECT * FROM emp", function (err, recordset) {
    //        if (err) {
    //            console.log(err);
    //        }
    //        else { 
    //            console.log(recordset);
    //        }
    //        conn.close();
    //    });
    //});

}

getEmp();