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

/* creates a string of all raw and refined materials of that type */
var matstring = "T1_" + mat_type + ",T1_" + ref_type;
for (let i = 2; i <= 8; i++) {
  matstring = matstring + ",T" + i + "_" + mat_type;
  matstring = matstring + ",T" + i + "_" + ref_type;
  if (i >= 4) {
    // adds the different rarities of materials to the query, materials of t3 or lower do not have rarities
    for (let j = 1; j <= 3; j++) {
      matstring =
        matstring + ",T" + i + "_" + mat_type + "_LEVEL" + j + "@" + j;
      matstring =
        matstring + ",T" + i + "_" + ref_type + "_LEVEL" + j + "@" + j;
    }
  }
}
var cities = "FortSterling"; // Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford
var qualities = "0"; // quality does not matter for us since raw materials and refined materials cannot be good, outstanding, excellent, or masterpiece

var url =
  "https://www.albion-online-data.com/api/v2/stats/prices/" +
  matstring +
  "?locations=" +
  cities +
  "&qualities=" +
  qualities +
  "&time-scale=6";

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

const prices = require("./allPricesForType.json"); // store our object from above
var formatted = {}; // empty JSON object to store formatted data

prices.forEach((item) => {
  const splitID = item.item_id.split("@");
  if (splitID.length == 2) {
    var level = splitID[1];
  }
  else {
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
fs.writeFile("./scripts/findPricesFormatted.json", jsonString, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON object to file");
    return console.log(err);
  } else {
    console.log("JSON file has been saved");
  }
});

const formattedPrices = require("./findPricesFormatted.json"); // store the formatted data for use in calculations