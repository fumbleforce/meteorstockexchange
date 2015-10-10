Meteor.startup(() => {
    while (User.find({ "profile.isBot": true }).count() < 10) {
        Accounts.createUser({
            email: faker.internet.email(),
            password: faker.internet.password(),
            profile: {
                nickname: "[BOT] " + faker.name.findName(),
                isBot: true
            },
        });
    }
    
});