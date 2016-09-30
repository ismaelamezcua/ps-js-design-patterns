/*

Observable Properties


 */

var Book = function (name, price) {
  var priceChanging = [];
  var priceChanged = [];

  this.name = function (value) {
    return name;
  };

  this.price = function (value) {
    if (value !== undefined && value !== price) {
      for (var i = 0; i < priceChanging.length; i += 1) {
        if (!priceChanging[i](this, value)) {
          return price;
        }
      }
      price = value;

      for (var i = 0; i < priceChanged.length; i += 1) {
        priceChanged[i](this);
      }
    }

    return price;
  };

  this.onPriceChanging = function (callback) {
    priceChanging.push(callback);
  };

  this.onPriceChanged = function (callback) {
    priceChanged.push(callback);
  };
};

var book = new Book ('JavaScript: The Good Parts', 23.99);

console.log('The name is: ' + book.name());
console.log('The price is: $' + book.price());

book.onPriceChanging(function (b, price) {
  if (price > 100) {
    console.log('System error, price has gone unexpectedly high.');
    return false;
  }

  return true;
});

book.onPriceChanged(function (b) {
  console.log('The book price has changed to: $' + b.price());
});

book.price(19.99);
book.price(200);