const http = require("http");
const fs = require("fs");

// http => (request, response)
// manera sincrona
// const data = fs.readFileSync("./WWW/file.txt");

// HTML, CSS, JS, IMG, Audio, Video
http.createServer((request, response) =>{
  console.log(request.url);
  const file = request.url == '/' ? "./WWW/index.html" : `./WWW${request.url}`;
  // manera asincrona
  fs.readFile(file, (error, data)=>{
    if(error){
      response.writeHead(404, {"Content-Type":"text/plain"});
      response.write("Not found");
      response.end();
    } else {
      // "hola.como estas".split(".")
      const extension = file.split('.').pop();
      switch (extension) {
        case 'txt':
          response.writeHead(200, {"Content-Type":"text/plain"});
          break;
        case 'html':
          response.writeHead(200, {"Content-Type":"text/html"});
          break;
        case 'jpeg':
          response.writeHead(200, {"Content-Type":"image/jpeg"});
          break;
        case 'css':
          response.writeHead(200, {"Content-Type":"text/css"});
          break;
        case 'js':
          response.writeHead(200, {"Content-Type":"text/javascript"});
          break;
        default:
          response.writeHead(200, {"Content-Type":"text/plain"});
      }

      response.write(data);
      response.end();
    }
  });
}).listen(4444);
