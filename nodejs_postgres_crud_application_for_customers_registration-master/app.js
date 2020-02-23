
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors')
var app = express();
const expressJwt = require('express-jwt');
const jwt =require('jsonwebtoken')

var customers = require('./routes/customers'); 
var routes = require('./routes');
 var app = express(); 


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // asking the express to use view engine i.e ejs

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/customers/register', customers.register);
app.post('/customers/login',customers.login);

 app.use(expressJwt({ secret:'abc' }).unless({
     path: [
        // public routes that don't require authentication
         '/customers/delete'
     ]
 }));

// app.get('/customers/add', customers.add);
app.get('/customers', customers.list);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete);
// app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.update);
// app.get('/getJson', customers.getJson);

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});