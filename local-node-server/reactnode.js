// server/server.js

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 4000;
const TOTAL_EVENTS = 5;

let TOTAL = 0;

function getRandomIndex(low, high) {
  const min = Math.ceil(low);
  const max = Math.floor(high);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomNamedEvents(request, response, name) {
  response.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  let eventsSent = 0;

  const listOfEvents = ['uploadStarted', 'uploadedToAzure', 'uploadAzureSuccess', 'uploadFilenetStarted', 'uploadSuccess']
  const listOfEventsMessages = ['uploadStarted - ', 'uploadedToAzure - ', 'uploadAzureSuccess - ', 'uploadFilenetStarted - ', 'uploadSuccess - ']

  // const responseData = {
  //   message: 'Success',
  //   formStatus: 'UPDATE'
  // };

  const interval = setInterval(() => {
    if (eventsSent === TOTAL_EVENTS) {
      clearInterval(interval);
      response.write(`id: ${eventsSent < 10 ? '0' : ''}${eventsSent++}\n`);
      response.write(`event: closeConnection\n`);
      response.write(`data:${name}\n\n\n`);
      response.end();
      console.log(`Sent ${TOTAL_EVENTS} events for ${name}, stopping...${TOTAL++}`);
      return;
    }
    // console.log(`Sending event ${eventsSent} for ${name}...`);
    response.write(`id: ${eventsSent < 10 ? '0' : ''}${eventsSent}\n`);
    response.write(`event: ${listOfEvents[eventsSent]}${name}\n`);
    response.write(`data:${listOfEventsMessages[eventsSent++]}${name}\n\n\n`);
  }, 500);

  request.on('close', () => {
    clearInterval(interval);
    response.end();
    console.log('Stopped sending events as client closed the connection.');
  });
}

http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }


  const urlObject = url.parse(request.url, true).query;
  request.url = request.url.substring(0, request.url.indexOf('?'));

  switch (request.url) {
    case '/ping':
      response.writeHead(200);
      response.write(`SUCCESS - ${new Date().toString()}`);
      response.end();
      break;
    case '/randomNamedEvents':
      createRandomNamedEvents(request, response, urlObject.name);
      break;
    default:
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`React NODE server running on port ${PORT}`);
