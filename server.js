const fetch = require("node-fetch");

const url = "http://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes";

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

getData(url);