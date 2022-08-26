/* server side code*/
// prerequsits
const http = require("http");

// load fs using promises  so code does not lock up
const fs = require("fs").promises;

// create a function to respond to http requests
const requestListener = function( request, response ) {
  // output request url
  console.log( request.url);
  if(request.url === "/") {
    // special variable __dirname has absolute path of where node code is running
    fs.readFile( __dirname + "/rancheras.html").then(
      contents => {
        response.setHeader("Content-Type","text/html; charset=UTF-8");
        // rsp that things are OK
        response.writeHead(200);

        // send back file contents + close response
        response.end( contents );
      }
    )
  }
  else if( request.url === "/rancheras") {
    // return rancheras json
    fs.readFile( __dirname + "/rancheras.json").then(
      contents => {
       response.setHeader("Content-Type","application/json; charset=UTF-8");
        // rsp that things are OK
        response.writeHead(200);

        // send back file contents + close response
        response.end( contents );
      }
    );
  }
}

const server = http.createServer( requestListener );

// define the tcp port and ip address  to tell our http server to listen to
const host = "0.0.0.0";
const port = 8080;

//start listening to http request
server.listen(
   port,
   host,
  ()=> {
    console.log( `Server is running on http://${host}:${port}`);
  }
);