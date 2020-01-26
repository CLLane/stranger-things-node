const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = 3000;
const url = 'http://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes'

let data = async (url) => {
 try {
  let response = await fetch(`${url}`)
  let responseData = await response.json()
  return responseData
} catch (error) {
  throw new Error('Failed to retrieve Stranger Things data')
}
}

app.get('/', async (request, response) => {
  let y = await data(url)
  console.log(y)
  response.status(200).send(y)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something horrible has happened', err)
  } 
  console.log(`server is listening on ${port}`)
})