var http = require('http');
var fs = require('fs');
var server = http.createServer(function(request, response){
    if(request.url == "/home"){
        fs.readFile("./public/plantation.html", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200,{'content-type':'text/html'});
                response.write(data);
            }
            response.end();
        });
    }
     else if(request.url.indexOf("bootstrap") > 0){
        fs.readFile("./Assignment2/bootstrap.min.css", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found'); 
            }
            else{
                response.writeHead(200,{'content-type':'text/stylesheet'});
                response.write(data);
            }
            response.end();
        });
    } 
    else if(request.url =="/plantation.css"){
        fs.readFile("./public/plantation.css", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200);
                response.write(data);
            }
            response.end();
        });
    }
    else if(request.url.indexOf("6.jpg")>0){
        fs.readFile("./public/6.jpg", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                // response.writeHead(200);
                response.write(data);
            }
            response.end();
        });
    }
     else{
        
        response.writeHead(200,{'content-type':'text/html'});
        response.write('<h1>mahith</h1>');
        response.end();
    }
});
server.listen(3555);
console.log("http://localhost:3555/home");