

User.generate = () => {
    Accounts.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(),
        profile: {
            nickname: "[BOT] " + faker.name.findName(),
            isBot: true
        },
    });
};

User.reSeed = (count) => {
    User.remove({ "profile.isBot": true });
    
    if (!count) {
        count = 20;
    }
    
    while (User.find({ "profile.isBot": true }).count() < count) {
        User.generate();
    }
};