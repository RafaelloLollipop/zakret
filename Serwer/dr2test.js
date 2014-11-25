var sqlite3 = require('sqlite3').verbose();
var util = require("util"),
    http = require('http'), 
     url = require('url'),
      qs = require('querystring');

var check;


var updateDataBase=0,dataFromCell=0 , odpytanie=0;
var imie='';
var skret=0;
var guzik = 0;
var users=[];

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'kreska server';
port = 1337;
host = '192.168.43.108';
//host = '10.20.114.227'
///gameIp = "127.0.0.1"
gameHost = 1337;


http = require('http');
fs = require('fs');
server = http.createServer( function(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    


if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                req.connection.destroy();
        });
        request.on('end', function () {
            var message = body;
            // use post['blah'], etc.
    

try {

            var json = JSON.parse(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }

        if (json.type==='dataRequest')
    { ///send all database to user            
            console.log("DataRequest z PC")
            console.log(dataFromCell+=1) ;
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write("[" + users.join(",") + "]")
            users=[];
                
                    users.push('{"userName" : "'+imie+'","turnValue" : '+skret+',"fireButt" : "'+guzik+'"}');

                response.end();
    }

    if (json.type==='phone'){
        console.log("Telefon updejt")
        console.log(odpytanie+=1) ;
        /// add or update player if exist
        imie = json.userName;
        skret = json.turnValue;
        guzik = json.fireButt;
    }  


});
    }

    else
    {
        console.log("GET");
        var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
