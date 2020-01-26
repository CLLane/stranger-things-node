const express = require("express");
const app = express();
const port = 3001;
const url =
  "http://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes";

const {
  calculateSeriesDuration,
  getAvgEpisodes,
  cleanEpisodes
} = require("./helper.js");
const data = require("./apiCall");

app.get("/", async (request, response) => {
  let fetchResponse = await data(url);
  let showId = fetchResponse.id;
  let seriesDuration = calculateSeriesDuration(fetchResponse);
  let avgEpisodes = getAvgEpisodes(fetchResponse);
  let episodes = cleanEpisodes(fetchResponse);

  response.status(200).send({
    [showId]: {
      totalDurationSec: seriesDuration,
      averageEpisodesPerSeason: avgEpisodes,
      episodes
    }
  });
});

app.listen(port, err => {
  if (err) {
    return console.log("something horrible has happened", err);
  }
  console.log(`server is listening on ${port}`);
});
