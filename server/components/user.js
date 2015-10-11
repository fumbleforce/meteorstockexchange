
User.extend({
    methods: {
        doTrade: function (companies) {
            let company = companies[Math.floor(Math.random()*(companies.length -1))];
            
            console.log("Trading in company", company.name);
            let orderCount = Order.find({
                ticker: company.get("ticker"),
                owner: this.get("_id")
            }).count();
            
            console.log("Has ", orderCount, "orders out for this company");
            
            if (orderCount === 0) {
                console.log("Creates an order");
                
                
                let sellOrder = Order.findOne({
                    ticker: company.get("ticker"),
                    orderType: "sell"
                }, {
                    sort: {
                        price: 1
                    }
                });
                
                let buyOrder = Order.findOne({
                    ticker: company.get("ticker"),
                    orderType: "buy"
                }, {
                    sort: {
                        price: 1
                    }
                });
                
                let price = 0;
                if (!_.isUndefined(buyOrder)) {
                    price = buyOrder.get("price") + 1;
                } else {
                    price = sellOrder.get("price") -1
                }
                
                Meteor.call("orders/create", {
                    ticker: company.get("ticker"),
                    _volume: Math.floor(Math.random()*10000) + 1000,
                    price:  price,
                    orderType: "buy",
                    issuer: this.get("_id")
                });
            }
            
            let stocks = Stock.find({
                owner: this.get("_id")
            }).fetch();
            
            if (stocks.length > 0) {
                let chosenStock = stocks[Math.floor(Math.random()*(stocks.length -1))];
                
                console.log(this.profile.nickname, "has", chosenStock.volume," stocks in", chosenStock.get("ticker"), "to sell");
                Meteor.call("orders/create", {
                    ticker: chosenStock.get("ticker"),
                    _volume: chosenStock.get("volume"),
                    price:  Math.floor(Math.random()*100),
                    orderType: "sell",
                    issuer: this.get("_id")
                });
            } else {
                console.log(this.profile.nickname, "has no stocks to sell :(");
            }
        }
    },
    
    
});


User.generate = () => {
    Accounts.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(),
        profile: {
            nickname: "[BOT] " + faker.name.findName(),
            isBot: true
        },
    });
};

User.reSeed = (count) => {
    User.remove({ "profile.isBot": true });
    
    if (!count) {
        count = 20;
    }
    
    while (User.find({ "profile.isBot": true }).count() < count) {
        User.generate();
    }
};

User.startBotTrading = () => {
    console.log("Starting bot trading");
    
    let bots = User.find({
        "profile.isBot": true
    }).fetch();
    
    let companies = Company.find().fetch();
    
    console.log(bots.length, "bots, and ", companies.length, "companies");
    
    Meteor.setInterval(() => {
        _.each(bots, (b) => {
            console.log(b.profile.nickname, "does trade");
            b.doTrade(companies);
        });
    }, 10000);
    
};