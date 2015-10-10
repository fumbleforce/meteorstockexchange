
Meteor.publish("company", function (opts) {
    let query = {};
    
    _.each(opts, (val, key) => {
        if (val) {
            query[key] = val;
        }
    });
        
    return Company.find(query);
});