Meteor.startup(() => {
    while (User.find({ "profile.isBot": true }).count() < 10) {
        User.generate();
    }
    
});