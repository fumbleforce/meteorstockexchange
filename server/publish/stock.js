
Meteor.publish("stocks", function (opts) {
    let query = {};
    
    if (opts.ident) {
        query.owner = User.findOne({ "profile.ident": opts.ident });
    }
    
    _.each(opts, (val, key) => {
        if (val) {
            query[key] = val;
        }
    });
        
    return Stock.find(query);
});