Template.companyTrading.onCreated(function () {
    this.ticker = FlowRouter.current().params.ticker;
    this.ordersSub = Meteor.subscribe("orders", { stock: this.ticker });
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
            stock: instance.ticker
        }, {
            sort: {
                createdAt: -1
            }
        });
    },
    
    sellers: () => {
        let instance = Template.instance();

        return Order.find({
            orderType: "sell",
            stock: instance.ticker
        }, {
            sort: {
                createdAt: -1
            }
        });
    },
    
});

Template.companyTrading.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
    
    "click .issue": function (e, t) {
        new Order({
            stock: this.ticker,
            volume: +t.find("[name='volume']").value,
            price: +t.find("[name='price']").value,
            orderType: t.find("[name='orderType']:checked").value,
            issuer: Meteor.userId()            
        }).save();
    }
});