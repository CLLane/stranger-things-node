const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = 3001;
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

calculateSeriesDuration = data => {
  let episodes = data._embedded.episodes;
  return episodes.reduce((totalSec, currentEpisode) => {
    totalSec = totalSec + currentEpisode.runtime * 60;
    return totalSec;
  }, 0);
};
getAvgEpisodes = data => {
  let episodes = data._embedded.episodes;
  let seasons = episodes.map(currentEpisode => currentEpisode.season);
  return calculateAvgEpisodes(seasons);
};

calculateAvgEpisodes = array => {
  let seasons = array.reduce((acc, cv) => {
    if (!acc.includes(cv)) {
      acc.push(cv)
    }
    return acc;
  }, [])

  let totalEpisodes = array.length;
  return totalEpisodes / seasons.length
};

cleanEpisodes = (data) => {
  let episodes = data._embedded.episodes;
  let episodeInfoArray = episodes.map(episode => {
    let summary = `${episode.summary}`
    let formattedSummary = `${summary.split('<p>').join('').split('</p>').join('').split('.')[0]}.`
    return {
      [episode.id]: {
        sequenceNumber: `s${episode.season}e${episode.number}`,
        shortTitle: `${episode.name.split(': ')[1]}`,
        airTimestamp: `${episode.airstamp}`,
        shortSummary: `${formattedSummary}`
      }
    }
  })
  return episodeInfoArray;
}

app.get('/', async (request, response) => {
  let fetchResponse = await data(url)
  let seriesDuration = calculateSeriesDuration(fetchResponse);
  let avgEpisodes = getAvgEpisodes(fetchResponse);
  let episodes = cleanEpisodes(fetchResponse);

  response.status(200).send({
    cleanedStrangerData: {
      totalDurationSec: seriesDuration,
      averageEpisodesPerSeason: avgEpisodes,
      episodes,
    }})
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something horrible has happened', err)
  } 
  console.log(`server is listening on ${port}`)
})