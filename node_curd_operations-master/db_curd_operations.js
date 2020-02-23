const pg = require('pg');
const conString = "postgres://postgres:mahith@localhost:5432/curd_operation";
const client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    
});

function addEmp(user) {
let insertQuery = `INSERT INTO datas.entry (id, name, age) VALUES (${user.id},'${user.name}',${user.age})`;
console.log('insertQuery-->', insertQuery);
  client.query(insertQuery, function( err,result) {
   if(err) {

      return console.error('error running query', err);
     
    } else {
       
        console.log('Inserted result...', result);

    }
  });
}

function listEmp() {
  console.log();
  client.query('SELECT * from datas.entry', function(err, result) {
      if(err) {
          return console.error('error running query', err);
      }
      else {
          console.log('List of users-->', result.rows);
        }
  });
}


function updateEmp(user) {
    //console.log(user);
    let updateUserQuery = `UPDATE datas.entry set name = '${user.name}', age =${user.age} where id = ${user.id}`;

    console.log('Update query -->', updateUserQuery);
    client.query(updateUserQuery, function(err, result) {
        if(err) {
            return console.error('error while updating query', err);
        }
        else {
             console.log('Update user result-->', result.rows);
        }
    });
}

function deleteEmp(Id) {
    //console.log(Id);
    let deleteQuery = `DELETE from datas.entry where id = ${Id}`;
    client.query(deleteQuery, function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        else {
             console.log('Delete result-->', result);
        }
    });
}

//module.exports = addEmp;

module.exports = {add: addEmp, list:listEmp, update:updateEmp, delete:deleteEmp};