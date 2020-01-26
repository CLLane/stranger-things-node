const fetch = require("node-fetch");

let data = async url => {
  try {
    let response = await fetch(`${url}`);
    let responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Failed to retrieve Stranger Things data");
  }
};

module.exports = data;
