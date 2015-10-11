Template.company.onCreated(function () {
    this.ticker = FlowRouter.current().params.ticker;
    this.activeView = new ReactiveVar("trading");
    this.companySub = Meteor.subscribe("company", { ticker: this.ticker });
    
    
    this.autorun(() => {
        console.log("sub ready", this.companySub.ready());
        
        if (this.companySub.ready()) {
            this.company = Company.findOne({ ticker: this.ticker });
        }
    });
});

Template.company.onRendered(function () {
    //drawPriceChart();
});

Template.company.helpers({
    company: () => {
        if (Template.instance().companySub.ready()) {
            return Template.instance().company;
        }
    },
    
    activeView: (view) => {
        return Template.instance().activeView.get() === view ? "active" : "";
    },
    
    view: () => {
        return {
            info: "companyInfo",
            historical: "companyHistory",
            trading: "companyTrading"
        }[Template.instance().activeView.get()];
    },
    
});

Template.company.events({
    "click [data-show]": (e, t) => {
        var show = e.currentTarget.getAttribute("data-show");
        t.activeView.set(show);
    },
});

