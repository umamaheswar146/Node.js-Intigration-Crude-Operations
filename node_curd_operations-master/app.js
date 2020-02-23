const db_operations = require('./db_curd_operations'); // accessing the object having functions
db_operations.list();
var user1={"id":16, "name":'abc',"age":23 }; // JSON formate representation of data
var user2={"id":22, "name":'xyz',"age":28 };
db_operations.add(user1); // calling the function
 db_operations.add(user2);
db_operations.list();
var user3 = {"id":16, "name":'Virat', "age":24};
db_operations.update(user3);
db_operations.delete(15);
db_operations.list();
console.log('end....');