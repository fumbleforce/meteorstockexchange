Template.traders.onCreated(function () {
    Subs.subscribe("topTraders", {});
});

Template.traders.onDestroyed(function () {

});

Template.traders.onRendered(function () {

});

Template.traders.helpers({
    traders: () => {
        return _.map(User.find().fetch(), (el, i) => {
            el.placement = i+1;
            return el;
        });
    }
});

Template.traders.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});

Template.listedTrader.onCreated(function () {

});

Template.listedTrader.onDestroyed(function () {

});

Template.listedTrader.onRendered(function () {

});

Template.listedTrader.helpers({

});

Template.listedTrader.events({
    "click .trader": function (e) {
        FlowRouter.go("/traders/"+this.profile.ident)

    },
});