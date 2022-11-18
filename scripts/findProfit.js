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
for (let i = 2; i <= 8; i++) {
    matstring = matstring + ",T" + i + "_" + mat_type;
    matstring = matstring + ",T" + i + "_" + ref_type;
}
var cities = "Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford";
var qualities = "1,2,3,4"

var url =
  "https://www.albion-online-data.com/api/v2/stats/prices/" +
  matstring +
  "?locations=" +
  cities +
  "&qualities=" +
  qualities +
  "&time-scale=24";

  let settings = { method: "Get" };
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      const jsonString = JSON.stringify(json);
      /* write JSON to file */
      fs.writeFile("./scripts/allPricesForType.json", jsonString, "utf8", function (err) {
        if (err) {
          console.log("An error occured while writing JSON object to file");
          return console.log(err);
        } else {
          console.log("JSON file has been saved");
        }
      });
    });