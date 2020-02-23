var pg = require("pg");
var connectionString = "postgres://postgres:mahithlocalhost:5432/curd_operation";
const client = new pg.Client(connectionString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    } 
}); 
//////////  inser Query /////////////////
function addEmp(req,res) {
   var user={
       id:req.body.id,
       name:req.body.name,
       roolnumber:req.body.roolnumber
   }

    let insertQuery = `INSERT INTO datas.student(id,name,roolnumber) VALUES (${user.id},'${user.name}',${user.roolnumber})`;
    console.log('insertQuery-->', insertQuery);
      client.query(insertQuery, function( err,result) {
       if(err) {
    
          return console.error('error running query', err);
         
        } else {
           
            console.log('Inserted result...', result);
            res.send("User Sucsees Fully Registerd")
        }
      });
    }
    //////////////// SingleData///////////
    
function SingleUp(req,res) {
    id=req.body.id;
    console.log(req.body);
    let SingleQuery=`SELECT * FROM datas.student where id= ${id}`;
    console.log(SingleQuery);
  client.query(SingleQuery, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      else {
        console.log(result.rows);
        res.render('C:/Users/Regnant/Downloads/node_curd_operations-master/node_curd_operations-master/dirname/hello',{data:result.rows});
        }
  });
}

//////////  Delete Query /////////////////
function deleteEmp(req,res) {
  
    id=req.body.id;

  let deleteQuery = `DELETE from datas.student where id = ${id}`;
  client.query(deleteQuery, function(err, result) {
      if(err) {
          return console.error('error running query', err);
      }
      else {
           console.log('Delete result-->', result);
           res.send("User  Deleated SucseesFully")
      }
  });
}
////////////// UpDate  /////////////////////

function updateEmp(req,res) {
  var user={
    id:req.body.id,
    name:req.body.name,
    roolnumber:req.body.roolnumber
}

  let updateUserQuery = `UPDATE datas.student set roolnumber= ${user.roolnumber}, name='${user.name}' where id= ${user.id}`;

  console.log('Update query -->', updateUserQuery);
  client.query(updateUserQuery, function(err, result) {
      if(err) {
          return console.error('error while updating query', err);
      }
      else {
           console.log('Update user result-->', result.rows);
           res.send("User SucseesFully Updated")
      }
  });
}

    module.exports = {add:addEmp,delete:deleteEmp,update:updateEmp,sig:SingleUp};