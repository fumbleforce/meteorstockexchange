Template.trader.onCreated(function () {
    Meteor.subscribe("stocks", { ident: FlowRouter.current().params.ident });
    
    this.traderSub = Meteor.subscribe("trader", { "profile.ident": FlowRouter.current().params.ident });
    
    let orderSubSet = false;
    
    this.autorun(() => {
        if (this.traderSub.ready() && !orderSubSet) {
            let trader = User.findOne({
                "profile.ident": FlowRouter.current().params.ident
            });
            
            Meteor.subscribe("traderOrders", { "owner": trader._id });
            orderSubSet = true;
        }
    });
});


Template.trader.onRendered(function () {

});

Template.trader.helpers({
    trader: () => {
        if (Template.instance().traderSub.ready()) {
            return User.findOne({
                "profile.ident": FlowRouter.current().params.ident
            });
        }
    },
    
    sellOrders: () => {
        return Order.find({
            orderType: "sell"
        });
    },
    
    buyOrders: () => {
        return Order.find({
            orderType: "buy"
        });
    },
    
});

Template.trader.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});