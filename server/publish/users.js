
Meteor.publish(null, function() {
    return Meteor.users.find(this.userId, {
        fields: {
            cash: 1,
        }
    });
});