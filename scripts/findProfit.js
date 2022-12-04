/*
 * this script finds the most profitable items to refine including:
 * the two types of materials, where to buy them, and where to sell them
 * note that this script assumes you will refine in a city with a bonus and does not take focus into account
 * runs independent of data in main.js, just need to input what type of material you are refining
 */

var mat_type = "HIDE"; // possible options: HIDE, ORE, WOOD, FIBER, ROCK
var ref_type = "LEATHER"; // should correspond to the option above: LEATHER, METALBAR, PLANK, CLOTH, STONE

const fetch = require("node-fetch"); // used to grab JSON from albion data project URL
const fs = require("fs"); // used to write JSON to disk

var matstring = "T1_" + mat_type + ",T1_" + ref_type;
var url;

/* creates a string of all raw and refined materials of that type */
function createURL() {
  for (let i = 2; i <= 8; i++) {
    matstring = matstring + ",T" + i + "_" + mat_type;
    matstring = matstring + ",T" + i + "_" + ref_type;
    if (i >= 4) {
      // adds the different rarities of materials to the query, materials of t3 or lower do not have rarities
      for (let j = 1; j <= 4; j++) {
        matstring =
          matstring + ",T" + i + "_" + mat_type + "_LEVEL" + j + "@" + j;
        matstring =
          matstring + ",T" + i + "_" + ref_type + "_LEVEL" + j + "@" + j;
      }
    }
  }
  var cities = "FortSterling"; // Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford
  var qualities = "0"; // quality does not matter for us since raw materials and refined materials cannot be good, outstanding, excellent, or masterpiece

  url =
    "https://www.albion-online-data.com/api/v2/stats/prices/" +
    matstring +
    "?locations=" +
    cities +
    "&qualities=" +
    qualities +
    "&time-scale=6";
}

/* find all the prices and write them to a JSON file */
function findAllPrices() {
  let settings = { method: "Get" };
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      const jsonString = JSON.stringify(json);
      /* write JSON to file */
      fs.writeFile(
        "./scripts/allPricesForType.json",
        jsonString,
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing JSON object to file");
            return console.log(err);
          } else {
            console.log("JSON file has been saved");
          }
        }
      );
    });
}

/* formats the data stored above in more readable and easier to use format */
function formatPrices() {
  const prices = require("./allPricesForType.json"); // store our object from above
  var formatted = {}; // empty JSON object to store formatted data

  prices.forEach((item) => {
    const splitID = item.item_id.split("@");
    if (splitID.length == 2) {
      var level = splitID[1];
    } else {
      var level = 0;
    }
    let primary_key = item.item_id + "_" + item.city;
    let data = {
      sell: item.sell_price_min,
      buy: item.buy_price_max,
      rarity: level,
    };
    formatted[primary_key] = [];
    formatted[primary_key].push(data);
  });

  const jsonString = JSON.stringify(formatted);
  /* write JSON to file */
  fs.writeFile(
    "./scripts/findPricesFormatted.json",
    jsonString,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON object to file");
        return console.log(err);
      } else {
        console.log("JSON file has been saved");
      }
    }
  );
}

/*
 * when refining, the required materials are 2 raw materials of the desired tier and 1 refined product from tier beneath desired tier
 * the following code will calculate the most profitable options by adding the costs of these materials and multiplying by (1 - returnRate)
 * it will then subtract the sell price of the refined material from this cost to find profit and list in order of profit
 */

function getProfit() {
  //const formattedPrices = require("./findPricesFormatted.json"); // store the formatted data for use in calculations
  /* first will start with T2 and T3 as they are special cases */
}

createURL();
setTimeout(findAllPrices, 3000);
setTimeout(formatPrices, 3000);
setTimeout(getProfit, 3000);
