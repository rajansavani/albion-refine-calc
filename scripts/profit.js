/*
 * used to calculate the estimated profit from refining given current buy and sell prices
 * incorporates taxes, mastery levels, focus, usage fees, and return rates in different cities
 */

const main = require("./main.js"); // import necessary variables defined in main.js
const format = require("./formatJSON.js"); // formats the JSON after running main.js
const prices = require("./formattedPrices.JSON");

/* find out the number of resources from each tier are needed to craft the desired amount of refined product */
async function numMatsNeeded() {
  var barsArray = {}; // used to store number of bars needed
  for (let i = main.lowest_tier; i < main.highest_tier; i++) {
    let barNum = Math.ceil(
      main.quantity * Math.pow(1 - main.return_rate, main.highest_tier - i)
    );
    let oreNeeded;
    let oreTier = i + 1;
    if (oreTier <= 4) {
      oreNeeded = 2;
    } else if (oreTier == 5) {
      oreNeeded = 3;
    } else if (oreTier == 6) {
      oreNeeded = 4;
    } else {
      oreNeeded == 5;
    }
    let oreNum = barNum * oreNeeded;
    let data = {
      ore_tier: oreTier,
      ore_num: oreNum,
      bar_num: barNum,
    };
    barsArray["Tier " + oreTier] = [];
    barsArray["Tier " + oreTier].push(data);
  }
  console.log(barsArray);
  return Promise.resolve(barsArray);
}

async function calcCost(matsArray) {
  let cost = 0;
  let count = 0;
  matsArray.forEach((item) => {
    if (count == 0) {
      let barTier = item.ore_tier - 1;
      let barString =
        "T" + barTier + "_" + main.refined_type + "_" + main.buy_city;
      let barPrice = prices[barString].buy;
      cost += item.bar_num * barPrice;
    }
    let oreString =
      "T" + item.ore_tier + "_" + main.material_type + "_" + main.buy_city;
    let orePrice = prices[oreString].buy;
    cost += item.ore_num * orePrice;
  });
  cost = cost * main.buy_fee;
  console.log(cost);
  return Promise.resolve(cost);
}

async function getAll() {
  const bars = await numMatsNeeded();
  const cost = await calcCost(bars);
  return `All the data: ${bars}, ${cost}`;
}

getAll().then((all) => {
  console.log("all the data");
});
