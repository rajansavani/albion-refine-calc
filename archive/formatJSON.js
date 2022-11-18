/*
 * this script will take the .JSON file created from main.js and reformat it to make accessing data easier
 */

const original = require("./allPricesForType.json");
var formatted = {}; // empty JSON object that will be used to store formatted data
const fs = require("fs"); // used to write JSON to disk

original.forEach((item) => {
  /* reduces each entry in array to just the sell price, buy price, and quality with city and item type acting as a key */
  let primary_key = item.item_id + "_" + item.city;
  let data = {
    sell: item.sell_price_min,
    buy: item.buy_price_max,
    quality: item.quality,
  };
  formatted[primary_key] = [];
  formatted[primary_key].push(data);
});

const jsonString = JSON.stringify(formatted);
/* write JSON to file */
fs.writeFile("./scripts/formattedPrices.json", jsonString, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON object to file");
    return console.log(err);
  } else {
    console.log("JSON file has been saved");
  }
});
