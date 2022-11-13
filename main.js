/*
 * let's start by filling in some info for the calc !
 * this is gonna be a lot but it will save a lot of time rather than calculating everything manually 
 */
const material_type = "ore"; // what type of material are you refining (ore, wood, fiber, stone, hide)
const buy_city = "Martlock"; // where you are sourcing the resources from
const sell_city = "Lymhurst"; // where you are selling the refined product
const return_rate = 0.367 // possible values include 0.152 / 0.435 in cities without bonus and 0.367 / 0.542 in cities with bonus
const using_focus = false;
const sell_tax = 0.065 // with premium, 4% tax plus 2.5% setup fee
const buy_fee = 0.025 // 2.5% setup fee
const quantity = 100; // how many of final product do we want to craft
const usage_fee = 200; // usage fee of the crafting place
/* input the mastery levels for each tier, will incorporate into calculation for focus refining */
const t4_mastery = 100;
const t5_mastery = 100;
const t6_mastery = 18;
const t7_mastery = 1;
const t8_mastery = 1;
const lowest_tier = 2; // the lowest tier refined resource we are going to buy
const highest_tier = 5; // the tier we are trying to refine up to
const quality = 1; // what rarity are we buying (ex. 4.1, 5.0, 6.3 etc)
/* this is optional, but it can be useful to record max load in order to determine how many resources you can carry in a single trip */
const max_load = 3460; // in kg, not including any buffs from food
const pie = true; // if true, means you are using pork pie to increase load
const go_over = true; // if true, means you are willing to go up to 130% weig
var store_data;

/* this is all the information we need, now we can call the API to get current prices
   if you need updated prices, please download the albion data project client and visit the markets! it helps everyone out
 */

const http = require('https');
const { json } = require('stream/consumers');

let req = http.get("https://www.albion-online-data.com/api/v2/stats/prices/T2_METALBAR,T3_ORE,T4_ORE,T5_ORE.json?locations=" + buy_city + "," + sell_city + "&qualities=" + quality + "&time-scale=24", function(res) {
	let data = '',
		store_data;

	res.on('data', function(stream) {
		data += stream;
	});
	res.on('end', function() {
		store_data = JSON.parse(data);

		// will output a Javascript object
		console.log(store_data);
	});
});

req.on('error', function(e) {
    console.log(e.message);
});

/* gonna be testing with some hard-coding, will be updated later */
console.log(store_data[0]);