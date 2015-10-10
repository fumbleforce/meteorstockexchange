
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
            cash: 1
        }
    });
});