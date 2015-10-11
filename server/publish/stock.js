
Meteor.publish("stocks", function (opts) {
    let query = {};
    
    _.each(opts, (val, key) => {
        if (val) {
            query[key] = val;
        }
    });
        
    return Stock.find(query);
});