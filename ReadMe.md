### Stranger Things Node

 * A data cleaner, built with node.js, and designed to pull in data and spit it out in a different structure.
 * Created with Node and Express, utilizing jest and enzyme for testing.

Data is requested from http://localhost:3001/, in order to do this you must clone down this repo, and npm install.
After you npm install you will be able to run npm test or node server.js.  If you run the testing suite you will find it incomplete. I was on a two hour time limit and decided to prioritize functionality over testing, that being said if given more time I would complete the testing suites in full. If you decide to run node server.js you can easily just open PostMan and make a get request to localhose:3001/.

### Installation and Setup
From the command line:
1. `git clone https://github.com/CLLane/stranger-things-node.git`
1. Run `npm install`
1. Run `node server.js`

In PostMan:
request `GET localhost://3001/`

Testing:
Run `nmp test`

### Technologies
- JavaScript / Node.js 
- Express.js 
- Jest / Enzyme

