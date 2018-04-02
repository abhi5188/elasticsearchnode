var excelnode = require('node-xlsx');
var port = 3300;

//Parses a file
//var obj = excelnode.parse(__dirname + '/SDU_EU_CBX_Hiring_Tracking.xlsx');

//Parses a buffer
//var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx'));
var express = require('express');
var app = express();

//For get excel as json method
app.use("/getExcelAsJson/:excelName", (req,res) => {

    console.log(`Excel to parse: ${req.params.excelName}`);

    var obj = excelnode.parse(__dirname +"/"+ req.params.excelName);

    console.log("Parsed Excel :"+JSON.stringify(obj));

    res.send(JSON.stringify(obj));

});


//For get L1 and L2 details function
app.use("/getL1L2detail/:candidateId", (req,res) => {

    console.log(`Candidate Id: ${req.params.candidateId}`);

});


//For update cells function
app.use("/updateCell/:excelName/:sheetName/:row_num/:column_name", (req,res) => {

    console.log(`Excel Name: ${req.params.excelName} Sheet Name: ${req.params.sheetName} Row Number: ${req.params.row_num}  Column Name: ${req.params.column_name}`);

});


app.listen(3300, () => {
    console.log(`Application is listening on port ${port}`);
});