const fetch = require("node-fetch");
const http = require('http');
const server = http.createServer();

const url = "http://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes";

server.listen(3001, () => {
  console.log('The HTTP server is listening at Port 3001')
})

server.on('request', async (request, response) => {
  if (request.method === 'GET') {
    let x = await getData(url)
    return x;
  }
})

// const app = express();
// const environment = process.env.NODE_ENV || 'development'
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

