var mfcoins = 0
var mfcoinRate = 0

// Every item in the game
// TODO: items should be part of the Game variable
var items = [
  {
    "name": "item_oldCalculator",
    "price": "100"
  },
  {
    "name": "item_oldCpu",
    "price": "250"
  },
  {
    "name": "item_oldComputerFromGrandpa",
    "price": "3750"
  },
  {
    "name": "item_rapsberrypy",
    "price": "5700"
  },
  {
    "name": "item_smartphone",
    "price": "9100"
  },
  {
    "name": "item_middleClassPC",
    "price": "17000"
  },
  {
    "name": "item_cheapServer",
    "price": "35000"
  },
  {
    "name": "item_gamingPC",
    "price": "78500"
  },
  {
    "name": "item_cheapMiner",
    "price": "179000"
  },
  {
    "name": "item_highEndUltraPC",
    "price": "350000"
  },
  {
    "name": "item_bigMiner",
    "price": "650000"
  },
  {
    "name": "item_miningFarm",
    "price": "850000"
  },
  {
    "name": "item_nasaPC",
    "price": "1500000"
  },
  {
    "name": "item_quantumRig",
    "price": "6500000"
  },
  {
    "name": "item_miningFarmSpace",
    "price": "25000000"
  },
  {
    "name": "item_miningFarmMoon",
    "price": "100000000"
  },
  {
    "name": "item_mfcoinTimeMachine",
    "price": "250000000"
  },
  {
    "name": "item_blackHolePoweredMiner",
    "price": "7750000000"
  }
]

// Rate is null (at the beginning)
var bSec = null;

// If there is no mfcoins Item in the localStorage, create one.
// If there is one, do the other thing.
if(localStorage.getItem("mfcoins") === null){
  // mfcoins are 0
  mfcoins = 0

  // Set the localStorage Item for the first time
  localStorage.setItem("mfcoins", "0");

  // Write the current amount of mfcoins on the page
  $(".mfcoinAmount").text(mfcoins.toFixed(0))

}else{

  // Get the amount of mfcoins and parse them to a float number
  mfcoins = parseFloat(localStorage.getItem("mfcoins"))

  $(".mfcoinAmount").text("loading...")
  $(".satoshiAmount").text("loading...")

  let satoshis = mfcoins;

}

/**
 *
 *  <-- Setting up the game´s functions -->
 *
 */



// Game variable which will contain any needed major function or needed variables for the game.
var Game = {}


// Every constant variable is saved here
Game.GameConst = {
  "priceMultiplier": 1.15,
  "VERSION": "1.4.0"
}

Game.units = [
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quattuordecillion",
      "Quindecillion",
      "Sexdecillion",
      "Septdecillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Unvigintillion",
      "Duovigintillion",
      "Trevigintillion",
      "Quattuorvigintillion",
      "Quinvigintillion",
      "Sexvigintillion",
      "Septvigintillion",
      "Octovigintillion",
      "Novemvigintillion",
      "Trigintillion"
]



/**
 * Calculating every price for the items when the game was started (and if there are any items).
 *
 * @param element {HTMLElement} - The HTML element of the item on the game page
 * @param price {Number} - The price of the item, got from the items Object
 * @param itemAmount {Number} - The current amount of the item, saved in the localStorage
 */

Game.setPriceAtGameBeginning = function (element, price, itemAmount) {

  // Calculation of the price
  var multiplier = Game.GameConst.priceMultiplier

  // Calculate the new price -> price * multiplier^itemAmount
  var calculation = (parseFloat(price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

  // Showing the actual price
  element.children()[2].textContent = calculation + " mfcoins"

  // Set the data-price attribute with the new price
  element.attr("data-price", calculation.toString())

}



/**
 * Function to increase the amount of the item (in the localStorage) with the specific identifier.
 *
 * @param id - The identifier of the item (the id from the list element)
 */
Game.itemAction = function (id) {

  var item = id
  var itemAmount = 0;

  if(localStorage.getItem(item) === null){
    localStorage.setItem(item, "1");
  }else{
    itemAmount = parseInt(localStorage.getItem(item))

    localStorage.setItem(item, "" + (itemAmount + 1) + "");

  }

}



/**
 * Calculating the mfcoins per Second - rate when the page was opened.
 *
 */
Game.setmfcoinPerSecondRateAtBeginning = function () {

  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      // HTML element on the game page
      var $element = $("#" + items[i].name)

      // Amnount of the item
      var itemAmount = localStorage.getItem(items[i].name)

      // Writing the amount on the page at the item´s element
      $element.children()[0].textContent = itemAmount

      // Only calculate the new price if there is more than 0 items.
      // If there are not enough items, it will just continue, and if there are,
      // it will execute the function and continue after it as well.
      if(itemAmount > 0) {
        Game.setPriceAtGameBeginning($element, parseFloat(items[i].price), parseInt(itemAmount))
      }

      // Getting the data-bits-per-sec attribute, needed for calculating the mfcoin/sec rate
      var bits_per_sec = $element.attr("data-bits-per-sec")
      itemAmount = parseInt(itemAmount)

      // The rate before
      var before = mfcoinRate

      // Calculating the rate
      mfcoinRate = mfcoinRate + (itemAmount * bits_per_sec)

      // Logging the calculation in the console
      console.log("i = " + i + " | MFC/sec before: " + before.toFixed(0) +
        " - Calculation made: " + before.toFixed(0) + " + (" + itemAmount + " * " + bits_per_sec + ") = " +  mfcoinRate.toFixed(0) +
        " | New MFC/sec at " + mfcoinRate.toFixed(0))
    }
  }

}



/**
 * Function which sets a new "mfcoin per Second" rate
 *
 * @param rate - The number which must be added to the current mfcoin per Second - rate
 * @returns {Number} - Returning the new mfcoin per Second - rate
 */
Game.setNewmfcoinRate = function (rate) {

  // Logging the new mfcoin per second rate
  console.log("setNewmfcoinRate -> New rate: " + (mfcoinRate + rate).toFixed(8) )

  // Showing the new rate on the page
  // Rounding at specific values
  if((mfcoinRate + rate) >= 1000000) {
    $(".bSecRateNumber").text((mfcoinRate + rate).toFixed(0).optimizeNumber())
  }else if((mfcoinRate + rate) >= 1000 ){
    $(".bSecRateNumber").text((mfcoinRate + rate).toFixed(0))
  }else if((mfcoinRate + rate) >= 1 ){
    $(".bSecRateNumber").text((mfcoinRate + rate).toFixed(0))
  }else{
    $(".bSecRateNumber").text((mfcoinRate + rate).toFixed(0))
  }

  // Returning the new rate
  return mfcoinRate = mfcoinRate + rate;

}



/**
 * This function will check if there is any change in the localStorage,
 * especially looking at the item amount. So it will actually calculate every price again and
 * again. (This function should be recoded)
 *
 * TODO: Find a better way for setting the price after an item was bought.
 */
Game.setNewPrice = function()
{
  // for-loop for getting the price multiplier and to calculate the new price
  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      var $element = $("#" + items[i].name)
      var itemAmount = localStorage.getItem(items[i].name)

      $element.children()[0].textContent = itemAmount

      // Only calculate if there is more than 0 items
      if(itemAmount > 0) {

        // Calculation of the price
        var multiplier = Game.GameConst.priceMultiplier
        var calculation = (parseFloat(items[i].price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

        // Showing the actual price
        $element.children()[2].textContent = calculation + " mfcoins"

        // Set the data-price attribute with the new price
        $element.attr("data-price", calculation.toString())

      }
    }
  }
  // End of the for-loop
}

/**
 * The function which adds new generated mfcoins to the current mfcoin amount.
 *
 * @param rate - The mfcoin per second rate; Needed for adding the generated mfcoins every second
 */
Game.bSecFunction = function (rate) {

  mfcoins = mfcoins + rate

  // Show both values on the page
  // Rounding the mfcoin number at specific set values
  if(mfcoins > 1000000){

    let mfcoinUnitNumber = mfcoins.optimizeNumber()

    $(".mfcoinAmount").text(mfcoinUnitNumber)
  }else if(mfcoins >= 1000){
    $(".mfcoinAmount").text(mfcoins.toFixed(0))
  }else if(mfcoins >= 1){
    $(".mfcoinAmount").text(mfcoins.toFixed(0))
  }else{
    $(".mfcoinAmount").text(mfcoins.toFixed(0))
  }


  // Rounding the satoshis amount at a specific value and optimize it for displaying on the screen.
  var satoshis = mfcoins;

  if(satoshis < 1) {
    $(".satoshiAmount").text(Math.round(satoshis))
  }else{

    let satoshiUnitNumber = satoshis.optimizeNumber()
    $(".satoshiAmount").text(satoshiUnitNumber)
  }

  // Save mfcoin amount in the storage
  localStorage.setItem("mfcoins", "" + mfcoins + "")

  console.log("mfcSec -> MFC/sec at " + rate.toFixed(0))

}

/**
 * Stops the B/sec interval.
 */
Game.stopBsec = function () {
  clearInterval(bSec)
}

/**
 * Function for optimizing the number with an unit for displaying it on the screen.
 *
 * @returns {string} An optimized number as a string with its unit
 */
Game.optimizeNumber = function () {
  if(this >= 1e6){
    let number = parseFloat(this)
    let unit = Math.floor(parseFloat(number.toExponential(0).toString().replace("+", "").slice(2)) / 3) * 3

    // let test = this.toExponential(0).toString().replace("+", "").slice(2)
    // console.log(test)

    var num = (this / ('1e'+(unit))).toFixed(0)

    var unitname = Game.units[Math.floor(unit / 3) - 1]

    return num + " " + unitname
  }

  return this.toLocaleString()
}

Number.prototype.optimizeNumber = Game.optimizeNumber
String.prototype.optimizeNumber = Game.optimizeNumber

/**
 * Resets the game
 */
Game.resetGame = function () {
  Game.stopBsec()
  localStorage.setItem("mfcoins", "0")
  localStorage.clear()
  location.reload()
}

// --------------------------------------------------- //

/**
 * <-- Now doing everything -->
 */


// Calculates the mfcoin/sec rate with the amount of every item multiplied with their given mfcoins/second rate.
Game.setmfcoinPerSecondRateAtBeginning()

// Stating the interval with the calculated mfcoin/second rate.
bSec = setInterval(function () {
  Game.bSecFunction(mfcoinRate);
}, 1000)


// Doing everything here when the game is ready to be used.
$(document).ready(function () {

  // Write the version into the .version span element
  $(".version").text("Version " + Game.GameConst.VERSION)

  // Write the mfcoin per second rate into the .bSecRateNumber span element
  if(mfcoinRate >= 1000){
    $(".bSecRateNumber").text(mfcoinRate.toFixed(0))
  }else if(mfcoinRate >= 1 ){
    $(".bSecRateNumber").text(mfcoinRate.toFixed(0))
  }else{
    $(".bSecRateNumber").text(mfcoinRate.toFixed(0))
  }


  // If clicked on the big mfcoin
  $(".mfcoin").click(function () {

    // Add 1 mfcoins
    mfcoins = mfcoins + 1

    // Show the new number on the page
    if(mfcoins > 1000000){

      let mfcoinUnitNumber = mfcoins.optimizeNumber()
      $(".mfcoinAmount").text(mfcoinUnitNumber)

    }else if(mfcoins >= 1000){
      $(".mfcoinAmount").text(mfcoins.toFixed(0))
    }else if(mfcoins >= 1){
      $(".mfcoinAmount").text(mfcoins.toFixed(0))
    }else{
      $(".mfcoinAmount").text(mfcoins.toFixed(0))
    }

    if(mfcoins < 1000000) {
      $(".satoshiAmount").text(Math.round(mfcoins))
    }else{

      let satoshiUnitNumber = mfcoins.optimizeNumber()
      $(".satoshiAmount").text(satoshiUnitNumber)
    }

    // Save the new amount of mfcoins in the localStorage storage
    localStorage.setItem("mfcoins", "" + mfcoins + "")

  });


  // If any item from the list was clicked...
  $(".purchaseItem").click(function () {

    // Get following attributes and children elements

    // id of the item
    var id = $(this).attr("id")

    // The price attribute as a float number
    var price = parseFloat($(this).attr("data-price"))

    // The b/sec attribute from the item as a float number
    var mfcoinsPerSecond = parseFloat($(this).attr("data-bits-per-sec"))

    // The element which shows how many of the item is existing
    var amountDisplay = $(this).children()[0]
    var amountDisplayAmount = parseInt(localStorage.getItem(id))

    var priceDisplay = $(this).children()[2]

    // If you have enough mfcoins, it´ll buy one item
    if(parseFloat(mfcoins.toFixed(0)) >= price){

      // Substract the price from the current mfcoin number and set it to the mfcoins variable.
      mfcoins = parseFloat(mfcoins.toFixed(0)) - price

      // Save the new amount of mfcoins in the localStorage storage
      localStorage.setItem("mfcoins", "" + mfcoins + "")

      // Changing amount number on the right of the item
      amountDisplayAmount = amountDisplayAmount + 1
      amountDisplay.textContent = amountDisplayAmount.toString()

      // Changing the mfcoins amount
      // Rounding the mfcoin number at specific values
      if(mfcoins > 1e6){

        let mfcoinUnitNumber = mfcoins.optimizeNumber()
        $(".mfcoinAmount").text(mfcoinUnitNumber)

      }else if(mfcoins >= 1000){
        $(".mfcoinAmount").text(mfcoins.toFixed(0))
      }else if(mfcoins >= 1){
        $(".mfcoinAmount").text(mfcoins.toFixed(0))
      }else{
        $(".mfcoinAmount").text(mfcoins.toFixed(0))
      }

      // Calculation the Satoshi amount
      if(mfcoins < 1e6) {
        $(".satoshiAmount").text(Math.round(mfcoins))
      }else{

        let satoshiUnitNumber = mfcoins.optimizeNumber()
        $(".satoshiAmount").text(satoshiUnitNumber)

      }

      // Increasing the amount of the specific item
      Game.itemAction(id)

      // Stops the interval
      Game.stopBsec()

      // Setting a new price and show it
      Game.setNewPrice()

      // Saving the new calculated mfcoin/second rate in a variable
      var newRate = Game.setNewmfcoinRate(mfcoinsPerSecond)

      // Restarting the interval with the new rate
      bSec = setInterval(function () {
        Game.bSecFunction(newRate);
      }, 1000)

    }

  })

  //
  // If the reset button was pressed, do following thing
  $(".resetButton").click(function () {
    Game.resetGame()
  })

});
