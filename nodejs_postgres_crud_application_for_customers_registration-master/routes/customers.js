const { Client } = require('pg');
const jwt =require('jsonwebtoken')
var connectionString = "postgres://postgres:mahith@localhost:5432/curd-operation";

const client = new Client({
    connectionString: connectionString
});

client.connect(function(err){
    if(err){
            console.error("error in conncecting dB", err);
    } else {
            console.log("Succesfull!..")
    }
});

exports.list =  function (req, res) {

    client.query('SELECT * FROM data.nodes',function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
       res.send(result.rows);
            
    });

};
       
       // res.render('customer/list', { title: "Customers", data: result.rows }); // callinng the list.ejs file 

  //console.log('HIIIIIIIIIIIIIIIIIIIII')
//exports.add = function (req, res) {
   // res.render('customer/add', { title: "Add Customer"  }); // calling the add.ejs file
//};

exports.edit =  function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM data.nodes WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
       res.send(result.rows);
        //res.render('customer/edit', { title: "Edit Customer", data: result.rows }); // calling the edit.ejs file
    });

};

exports.save = function (req, res) {

    var cols = [req.body.id, req.body.name,req.body.phone];
    validateUser(req.body.email,req.body.password)
    
    
    client.query('INSERT INTO data.nodes(id,name,phone) VALUES($1, $2, $3) RETURNING *', cols, function (err, result) {
        if(err){
                                        res.status(404);
                                        console.error(err);
                                } else {
                                        res.status(200);
                                        res.send(req.body);
                                }
                            

                        });
                    }
                

exports.update =  function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id];
    
       client.query('UPDATE data.nodes SET name=$1, address=$2,email=$3, phone=$4 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.send('update');
    });

};

exports.delete = async function (req, res) {

    var id = req.params.id;

    client.query("DELETE FROM data.nodes WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.send('delete');
    });

};




exports.register = function(req,res)  {
    var cols = [req.body.email, req.body.password]
  //  console.log(cols)
    client.query('insert into data.users (email,password) VALUES($1, $2) ', cols, (err, result) => {
            if(err){
                    res.status(404);
                    console.error(err);
            } else {
                 const token = jwt.sign({ sub: req.body.email }, "abc");
                //  const { password, ...userWithoutPassword } = user;

                    res.status(200);
                    res.send(result.rows)
                  res.send({'token':token});
            }
    });
};

exports.login = function (req,res){
    var cols=[

      req.body.email,
      req.body.password 
    ]
    console.log(cols)
   client.query ( 'SELECT * from data.users where email=$1 and password=$2 ', cols, (err, result) => {

    
        if(err){
            res.status(401);
            console.error(err);
    } else
    {
        console.log(result.rows) 
        if(result.rows.length > 0){
        
            const token = jwt.sign({ sub: req.body.email }, "abc");
          //  console.log(token)
         // const { password, ...userWithoutPassword } = user;
     
                 res.status(200).send({'token':token});
        } else{
             res.send({'token':'INVALIDE AUTHORIZATION'})  
        }
        
    }
    
    
});
    };



async function validateUser(email,password){
    var cols = [email, password]
    console.log(email, password);
var valProm = new Promise((reslove, reject)=>{
    client.query('Select * from data.users where email = $1 and password = $2', cols, (err, result) => {
            if(err){
                    console.error(err);
                    reject(err)
            } else {
                console.log(result.rows)
                if(result.rows.length > 0){
                    reslove(true)       
                } else{
                    reslove(false)
                }
            }
    });
});
return valProm;
}

