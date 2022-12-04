/*
 * when refining, the required materials are 2 raw materials of the desired tier and 1 refined product from tier beneath desired tier
 * the following code will calculate the most profitable options by adding the costs of these materials and multiplying by (1 - returnRate)
 * it will then subtract the sell price of the refined material from this cost to find profit and list in order of profit
 */
function getProfit() {
  const formattedPrices = require("./findPricesFormatted.json"); // store the formatted data for use in calculations
  /* first will start with T2 and T3 as they are special cases */
  
}

