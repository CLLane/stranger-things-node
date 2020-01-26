const calculateSeriesDuration = data => {
  let episodes = data._embedded.episodes;
  return episodes.reduce((totalSec, currentEpisode) => {
    totalSec = totalSec + currentEpisode.runtime * 60;
    return totalSec;
  }, 0);
};

const getAvgEpisodes = data => {
  let episodes = data._embedded.episodes;
  let seasons = episodes.map(currentEpisode => currentEpisode.season);
  return calculateAvgEpisodes(seasons);
};

const calculateAvgEpisodes = array => {
  let seasons = array.reduce((acc, cv) => {
    if (!acc.includes(cv)) {
      acc.push(cv);
    }
    return acc;
  }, []);

  let totalEpisodes = array.length;
  return totalEpisodes / seasons.length;
};

const dateToEpoch = (dateString) => {
  var someDate = new Date(dateString);
  return someDate.getTime();
}

cleanEpisodes = data => {
  let episodes = data._embedded.episodes;
  let episodeInfoArray = episodes.map(episode => {
    let summary = `${episode.summary}`;
    let formattedSummary = `${
      summary
        .split("<p>")
        .join("")
        .split("</p>")
        .join("")
        .split(".")[0]
    }.`;
    //line 45 was found on stack overflow (https://stackoverflow.com/questions/13707333/javascript-convert-date-time-string-to-epoch)//
    let epochTime = dateToEpoch(episode.airstamp);
    return {
      [episode.id]: {
        sequenceNumber: `s${episode.season}e${episode.number}`,
        shortTitle: `${episode.name.split(": ")[1]}`,
        airTimestamp: `${epochTime}`,
        shortSummary: `${formattedSummary}`
      }
    };
  });
  return episodeInfoArray;
};

module.exports = { calculateSeriesDuration, getAvgEpisodes, cleanEpisodes };
