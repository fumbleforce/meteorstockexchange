
Meteor.publish("orders", function (opts) {
    let query = {
        completed: false,
    };
    
    _.each(opts, (val, key) => {
        if (val) {
            query[key] = val;
        }
    });
        
    return Order.find(query);
});


Meteor.publish("traderOrders", function (id) {
    return Order.find({
        issuer: id
    });
});