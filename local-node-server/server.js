const http = require('http');
const url = require('url');
const PORT = 5000;


http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');
  switch (request.url) {
    case '/ping':
      console.log('LOCAL :: ping');
      response.write(`SUCCESS - ${new Date().toString()}`);
      response.end();
      break;
    case '/get':
      const asdf = {};

      http.get('http://cr1iclappqa001/STAR.Servicing.IClaims.Services.FHA/api/loans/0002200415/cases')
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error));

      response.write(asdf);
      response.end();
      break;
    default:
      console.log('LOCAL :: unknown_route');
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`Local test server running on port ${PORT}`);
