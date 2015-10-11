Template.trader.onCreated(function () {
    Subs.subscribe("stocks", { ident: FlowRouter.current().params.ident });
    
    this.traderSub = Subs.subscribe("trader", { "profile.ident": FlowRouter.current().params.ident });
    this.trader = { _id: "-1" };
    let orderSubSet = false;
    
    this.autorun(() => {
        if (this.traderSub.ready() && !orderSubSet) {
            this.trader = User.findOne({
                "profile.ident": FlowRouter.current().params.ident
            });
            
            Subs.subscribe("traderOrders", this.trader._id);
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
        if (Template.instance().traderSub.ready()) {
            return Order.find({
                orderType: "sell",
                issuer: Template.instance().trader._id,
                completed: false
            });
        }
    },
    
    buyOrders: () => {
        if (Template.instance().traderSub.ready()) {
            return Order.find({
                orderType: "buy",
                issuer: Template.instance().trader._id,
                completed: false
            });
        }
    },
    
    ownedStocks: () => {
        if (Template.instance().traderSub.ready()) {
            return Stock.find({
                owner: Template.instance().trader._id
            });
        }
    }
    
});

Template.trader.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});