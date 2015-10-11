Template.companyTrading.onCreated(function () {
    this.ticker = FlowRouter.current().params.ticker;
    this.ordersSub = Meteor.subscribe("orders", { ticker: this.ticker });
});

Template.companyTrading.onRendered(function () {
    $(".checkbox").checkbox({
        onChange: function () {
            console.log("Checked", this);
        }
    })
});

Template.companyTrading.helpers({

    buyers: () => {
        let instance = Template.instance();
        
        return Order.find({
            orderType: "buy",
            ticker: instance.ticker
        }, {
            sort: {
                price: -1,
            }
        });
    },
    
    sellers: () => {
        let instance = Template.instance();

        return Order.find({
            orderType: "sell",
            ticker: instance.ticker
        }, {
            sort: {
                price: 1,
            }
        });
    },
    
});

Template.companyTrading.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
    
    "click .issue": function (e, t) {
        Meteor.call("orders/create", {
            ticker: this.ticker,
            _volume: +t.find("[name='volume']").value,
            price: +t.find("[name='price']").value,
            orderType: t.find("[name='orderType']:checked").value,
            issuer: Meteor.userId()
        });
    }
});