function Time() {
  // Creating object of the Date class
  var date = new Date();
  // Get current hour
  var hour = date.getHours();
  // Get current minute
  var minute = date.getMinutes();
  // Get current second
  // var second = date.getSeconds();
  // Variable to store AM / PM
  var period = "";
  // Assigning AM / PM according to the current hour
  if (hour >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }
  // Converting the hour in 12-hour format
  if (hour == 0) {
    hour = 12;
  } else {
    if (hour > 12) {
      hour = hour - 12;
    }
  }
  // Updating hour, minute, and second
  // if they are less than 10
  hour = update(hour);
  minute = update(minute);
  // second = update(second);
  // Adding time elements to the div
  document.getElementById("digital-clock").innerText = hour + " : " + minute + " " + period;
  // Set Timer to 1 sec (1000 ms)
  setTimeout(Time, 1000);
}
// Function to update time elements if they are less than 10
// Append 0 before time elements if they are less than 10
function update(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}
Time();

// Fetches the current gold price (XAU/USD per troy ounce)
// from the free gold-api.com API and displays it under the clock
function GoldPrice() {
  fetch("https://api.gold-api.com/price/XAU")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Format the price with a thousands separator and 2 decimals
      var price = data.price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      document.getElementById("gold-price").innerText = "Gold 24K: $" + price + " / oz";
      // 21K = 21/24 pure gold, 1 troy ounce = 31.1035 grams
      var price21kPerGram = data.price * (21 / 24) / 31.1035;
      var price21k = price21kPerGram.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      document.getElementById("gold-price-21k").innerText = "Gold 21K: $" + price21k + " / g";
    })
    .catch(function () {
      // Only show an error if no price has been displayed yet
      var element = document.getElementById("gold-price");
      if (element.innerText.trim() === "") {
        element.innerText = "Gold: unavailable";
      }
    });
  // Refresh the price every 1 minute (60000 ms)
  setTimeout(GoldPrice, 60000);
}

// Shows or hides the gold price lines, starting the
// price updater the first time they are enabled
var goldStarted = false;
function setGoldVisible(visible) {
  document.getElementById("gold-price").classList.toggle("hidden", !visible);
  document.getElementById("gold-price-21k").classList.toggle("hidden", !visible);
  if (visible && !goldStarted) {
    goldStarted = true;
    GoldPrice();
  }
}

// A long press (500 ms) anywhere on the page toggles the options menu.
// The choice is remembered in localStorage for the next visit.
var LONG_PRESS_MS = 500;
var pressTimer = null;

function startPress() {
  pressTimer = setTimeout(function () {
    pressTimer = null;
    document.getElementById("options-menu").classList.toggle("hidden");
  }, LONG_PRESS_MS);
}

function cancelPress() {
  if (pressTimer) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
}

document.addEventListener("mousedown", startPress);
document.addEventListener("mouseup", cancelPress);
document.addEventListener("mouseleave", cancelPress);
document.addEventListener("touchstart", startPress);
document.addEventListener("touchend", cancelPress);
document.addEventListener("touchcancel", cancelPress);
// Prevent the right-click menu so a long press stays clean
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.getElementById("toggle-gold").addEventListener("change", function (event) {
  var enabled = event.target.checked;
  setGoldVisible(enabled);
  localStorage.setItem("showGold", enabled ? "1" : "0");
});

// Restore the saved preference on load (default: gold hidden)
var showGold = localStorage.getItem("showGold") === "1";
document.getElementById("toggle-gold").checked = showGold;
setGoldVisible(showGold);
