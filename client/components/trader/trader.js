Template.trader.onCreated(function () {
    Meteor.subscribe("stocks", { ident: FlowRouter.current().params.ident });
    Meteor.subscribe("trader", { ident: FlowRouter.current().params.ident });
});


Template.trader.onRendered(function () {

});

Template.trader.helpers({
    trader: () => {
        return User.findOne({ ident: FlowRouter.current().params.ident });
    }
});

Template.trader.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});