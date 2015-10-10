Template.companies.onCreated(function () {
    Meteor.subscribe("company", {});
});

Template.companies.onDestroyed(function () {

});

Template.companies.onRendered(function () {

});

Template.companies.helpers({
    companies: () => {
        console.log(Company.find().fetch());
        return Company.find();
    }
});

Template.companies.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});

Template.listedCompany.onCreated(function () {

});

Template.listedCompany.onDestroyed(function () {

});

Template.listedCompany.onRendered(function () {

});

Template.listedCompany.helpers({
});

Template.listedCompany.events({
    "click .listed.company": function (e) {
        console.log(this);
        let ticker = this.ticker;
        FlowRouter.go("/companies/" + ticker);
    },
});