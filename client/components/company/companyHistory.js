Template.companyHistory.onCreated(function () {
    this.priceSub = Meteor.subscribe("priceHistory", FlowRouter.current().params.ticker);
});

Template.companyHistory.onRendered(function () {
    console.log("Company history rendered");
    
    this.ticker = FlowRouter.current().params.ticker;
    
    this.autorun(() => {
        if (this.priceSub.ready()) {
            let data = PriceHistory.find({ ticker: this.ticker });
            drawPriceChart(data);
        }
    })
});

Template.companyHistory.helpers({

});

Template.companyHistory.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});






function drawPriceChart (data) {
    console.log("Drawing chart to", $(".priceHistoryChart")[0]);
    let instance = Template.instance();
    let history = PriceHistory.findOne({ ticker: instance.ticker });
    if (_.isUndefined(history)) {
        console.log("history not yet loaded");
        return;
    }
    let prices = history.get("prices");
    
    instance.chart = $(".priceHistoryChart").highcharts("StockChart", {
        rangeSelector : {
            selected : 1
        },

        title : {
            text : instance.data.ticker + " Stock Price"
        },

        series : [{
            name : instance.data.ticker,
            data : prices,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
}