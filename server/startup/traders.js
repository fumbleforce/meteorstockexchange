Meteor.startup(() => {
    while (User.find({ "profile.isBot": true }).count() < 20) {
        User.generate();
    }
    
    User.startBotTrading();
});