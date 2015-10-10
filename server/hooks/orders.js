
Order.getCollection().after.insert(function (userId, doc) {
    if (doc.orderType === "buy") {
        Order.findMatchingSellers(doc);
    } else {
        Order.findMatchingBuyers(doc);
    }
});