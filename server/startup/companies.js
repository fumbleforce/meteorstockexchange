
Meteor.startup(() => {
    while (Company.find().count() < 10) {
        Company.generate();
    }
});