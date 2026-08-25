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
GoldPrice();
