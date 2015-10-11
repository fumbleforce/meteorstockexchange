
Meteor.publish(null, function() {
    return Meteor.users.find(this.userId, {
        fields: {
            cash: 1,
        }
    });
});

Meteor.publish("traders", function () {
    return Meteor.users.find({}, {
        fields: {
            _id: 1,
            cash: 1,
            profile: 1,
        }
    });
});


Meteor.publish("trader", function (opts) {
    let query = {};
    
    _.each(opts, (val, key) => {
        if (val) {
            query[key] = val;
        }
    });
    
    return Meteor.users.find(query, {
        fields: {
            _id: 1,
            cash: 1,
            profile: 1,
        }
    });
});


Meteor.publish("topTraders", function () {
    return Meteor.users.find({}, {
        fields: {
            cash: 1,
            profile: 1,
        },
        limit: 10,
        sort: {
            cash: -1
        }
    });
});