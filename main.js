/*
 * let's start by filling in some info for the calc !
 * this is gonna be a lot but it will save a lot of time rather than calculating everything manually
 */
const material_type = "HIDE"; // what type of material are you refining (ore, wood, fiber, stone, hide)
const refined_type = "LEATHER";
const buy_city = "FortSterling"; // where you are sourcing the resources from
const sell_city = "Martlock"; // where you are selling the refined product
const return_rate = 0.367; // possible values include 0.152 / 0.435 in cities without bonus and 0.367 / 0.542 in cities with bonus
const using_focus = false;
const sell_tax = 0.065; // with premium, 4% tax plus 2.5% setup fee
const buy_fee = 0.025; // 2.5% setup fee
const quantity = 1000; // how many of final product do we want to craft
const usage_fee = 200; // usage fee of the crafting place
/* input the mastery levels for each tier, will incorporate into calculation for focus refining */
const t4_mastery = 100;
const t5_mastery = 100;
const t6_mastery = 18;
const t7_mastery = 1;
const t8_mastery = 1;
const lowest_tier = 2; // the lowest tier refined resource we are going to buy
const highest_tier = 5; // the tier we are trying to refine up to
const quality = "1"; // what rarity are we buying (ex. 4.1, 5.0, 6.3 etc)
/* this is optional, but it can be useful to record max load in order to determine how many resources you can carry in a single trip */
const max_load = 3460; // in kg, not including any buffs from food
const pie = true; // if true, means you are using pork pie to increase load
const go_over = true; // if true, means you are willing to go up to 130% weig

module.exports = {
  material_type,
  refined_type,
  buy_city,
  sell_city,
  return_rate,
  using_focus,
  sell_tax,
  buy_fee,
  quantity,
  usage_fee,
  t4_mastery,
  t5_mastery,
  t6_mastery,
  t7_mastery,
  t8_mastery,
  lowest_tier,
  highest_tier,
  quality,
  max_load,
  pie,
  go_over,
};

/*
 *	this is all the information we need, now we can call the API to get current prices
 *	if you need updated prices, please download the albion data project client and visit the markets! it helps everyone out
 */

const fetch = require("node-fetch"); // used to grab JSON from albion data project URL
const fs = require("fs"); // used to write JSON to disk
const { pid } = require("process");

var mat_string = "T" + lowest_tier + "_" + refined_type;
for (var i = lowest_tier + 1; i <= highest_tier; i++) {
  mat_string = mat_string + ",T" + i + "_" + material_type;
}
/* outputs T2_METALBAR,T3_ORE,T4_ORE,T5_ORE,T5_METALBAR */
mat_string = mat_string + ",T" + highest_tier + "_" + refined_type;
/* other inputs we need are the cities and qualities */
var city_string = buy_city + "," + sell_city;
var quality_string = quality;

/* this is all the info we need to create a link and grab the information */
var url =
  "https://www.albion-online-data.com/api/v2/stats/prices/" +
  mat_string +
  "?locations=" +
  city_string +
  "&qualities=" +
  quality_string +
  "&time-scale=24";

/* grab data as JSON from url */
let settings = { method: "Get" };
fetch(url, settings)
  .then((res) => res.json())
  .then((json) => {
    const jsonString = JSON.stringify(json);
    /* write JSON to file */
    fs.writeFile("./scripts/marketPrices.json", jsonString, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON object to file");
        return console.log(err);
      } else {
        console.log("JSON file has been saved");
      }
    });
  });