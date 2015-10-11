Company.getCollection().after.insert(function (userId, doc) {
    PriceHistory.insert({
        last: 1,
        ticker: doc.ticker
    });
});