var express = require('express');
var pg = require("pg");
var connectionString = "postgres://postgres:mahithlocalhost:5432/curd_operation";
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
const client = new pg.Client(connectionString);
const db_operations = require('./Db-crudeoperations-Express');
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    
}); 
// WEW Need To Import-----------
// $ npm install body-parser --save
// $ npm install cookie-parser --save
// $ npm install multer --save  
//------------------------------------------------------------------//
// Request is Comming From The Client //
//1.Retriving single student Data Single Student Data................................................................
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//To Work With Service We Need bodyParser
app.get('/', function (req, res,) {

res.sendFile("C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/SingleData.html");

     });
     
     app.post('/',db_operations.sig)
//1.Retriving All student Data Single Student Data....................................................................
 app.get('/AllStudent', function (req, res,) {
       client.query('SELECT * from data.nodes',function(err,result) {
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.render('C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/index.ejs',{data:result.rows});
       });
    
});

//2.Posting Data..............................................................................
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//To Work With Service We Need bodyParser
app.use(express.static('public'));//To Display Images WE Need To Write
app.get('/PostData', function (req, res) {
   
    res.sendFile("C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/index.html");
 })
 app.post('/PostData',db_operations.add)
 
//3.Delet Data...................................................................................
app.get('/Deleate', function (req, res) {
    res.sendFile("C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/DEleate.html");
 })
app.post('/Deleate',db_operations.delete)
// 4.Update Data......................................................................................
app.get('/Update', function (req, res) {
    res.sendFile("C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/Update.html");
 })
app.post('/Update',db_operations.update)
var server = app.listen(5432, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})