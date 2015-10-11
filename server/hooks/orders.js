Order.getCollection().after.update(function (userId, doc, fieldNames, mod) {
    
    if (mod.$set && mod.$set.completed) {
            
        console.log("Updated last price of ", doc.ticker, "to", doc.price);
        
        PriceHistory.update({ ticker: doc.ticker }, {
            $push: {
                prices: [
                    new Date().getTime(),
                    doc.price
                ]
            },
            $set: {
                last: doc.price
            }
        });
    }
});