
User.extend({
    methods: {
        doTrade: function (companies) {
            let company = companies[Math.floor(Math.random()*(companies.length -1))];
            
            let aMinAgo = moment.utc().subtract(1, "minutes").toISOString();
            console.log(aMinAgo);
            Order.remove({
                ticker: company.get("ticker"),
                issuer: this.get("_id"),
                orderType: "buy",
                completed: false,
            }, {
                multiple: true
            });
            
            console.log("Trading in company", company.name);
            console.log("User is", this.get("_id"));
            let orderCount = Order.find({
                ticker: company.get("ticker"),
                issuer: this.get("_id"),
                orderType: "buy",
                completed: false
            }).count();
            
            console.log("Has ", orderCount, " buy orders out for this company");
            
            if (orderCount < 3) {
                console.log("Creates an order");
                
                
                let sellOrder = Order.findOne({
                    ticker: company.get("ticker"),
                    orderType: "sell",
                    completed: false
                }, {
                    sort: {
                        price: -1
                    }
                });
                
                let buyOrder = Order.findOne({
                    ticker: company.get("ticker"),
                    orderType: "buy",
                    completed: false
                }, {
                    sort: {
                        price: 1
                    }
                });
                
                let price = 0;
                if (!_.isUndefined(buyOrder) && !_.isUndefined(sellOrder)) {
                    price = _.random(buyOrder.get("price"), Math.floor(sellOrder.get("price")*2));
                } else {
                    price = _.random(10, 100);
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
        _.each(bots, (b, i) => {
            Meteor.setTimeout(() => {
                console.log(b.profile.nickname, "does trade");
                b.doTrade(companies);
            }, Math.floor(Math.random()*1000) + (i*1000)) ;
        });
    }, 1000*bots.length);
    
};