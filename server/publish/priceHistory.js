
Meteor.publish("priceHistoryLast", function (opts) {
    
    return PriceHistory.find({}, {
        fields: {
            last: 1,
            ticker: 1,
        }
    });
});


Meteor.publish("priceHistory", function (ticker) {
    
    return PriceHistory.find({
        ticker: ticker
    }, {
        fields: {
            last: 1,
            prices: 1,
            ticker: 1,
        }
    });
});