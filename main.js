/*
 * let's start by filling in some info for the calc !
 * this is gonna be a lot but it will save a lot of time rather than calculating everything manually 
 */
const material_type = "ore"; // what type of material are you refining (ore, wood, fiber, stone, hide)
const buy_city = "Martlock"; // where you are sourcing the resources from
const sell_city = "Thetford"; // where you are selling the refined product
const return_rate = 0.367 // possible values include 0.152 / 0.435 in cities without bonus and 0.367 / 0.542 in cities with bonus
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

/* this is all the information we need, now we can call the appropriate functions using this data */