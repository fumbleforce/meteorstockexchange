Order.extend({
    events: {
        beforeInsert: function (e) {
            if (this.get("soldByCompany")) {
                return;
            }
            
            let volume = this.get("_volume");
            
            console.log("Checking validity of inserted order");
            let issuer = User.findOne(this.get("issuer"));
            
            if (this.get("orderType") === "buy") {
                
                console.log("Charging", issuer.get("profile.nickname"), "for buy order of", volume, "x", this.get("ticker"));
                let cost = this.orderValue(volume);
                if (issuer.get("cash") < cost) {
                    // Not enough money to buy
                    console.log("Not enough money");
                    e.preventDefault();
                    return;
                } else {
                    console.log("Has", issuer.get("cash"), "to pay", cost);
                }
                
                //issuer.changeWallet(-cost);
            } else {
                
                let stocks = Stock.find({ owner: this.get("issuer") }).fetch();
                let stockCount = 0;
                _.each(stocks, (s) => {
                    stockCount += s.get("volume");
                });
                
                console.log(issuer.get("profile.nickname"), "is selling", volume, "of", this.get("ticker"), "and has", stockCount);
                
                if (stockCount < volume) {
                    // Not enough stock to sell
                    console.log("Can't sell this many");
                    e.preventDefault();
                    return;
                } else {
                    
                    let removed = 0;
                    _.each(stocks, (s) => {
                        if (removed >= volume) return;
                        
                        if (removed + s.get("volume") > volume) {
                            let sVol = s.get("volume");
                            s.inc("volume", removed - volume);
                            removed += volume - removed;
                            s.save();
                            return true;
                        } else {
                            removed += s.get("volume");
                            s.remove();
                            return false;
                        }
                    });
                    console.log("Removed", removed, "stocks");
                }
            }
        },
        
        afterInsert: function (e) {
            console.log("Inserted order, trying to find matching");
            this.findMatching();
        },
        
        events: {
            afterChange: function (e) {
                console.log(e.data.fieldName);
            }
        }
    },
    
    methods: {
        orderValue: function (volume) {
            // Avoid silly floating errors
            if (_.isUndefined(volume)) {
                volume = this.get("_volume");
            }
            return (Math.floor(this.get("price") * 100) * volume) / 100;
        },
        
        matched: function (volume, price) {
            console.log("Matched", volume);
            
            if (this.get("orderType") === "buy") {
                console.log("Issuing", volume, "stocks of", this.get("ticker"), "to", this.get("issuer"));
                Stock.insert({
                    volume: volume,
                    owner: this.get("issuer"),
                    ticker: this.get("ticker"),
                    buyPrice: price
                });
                User.findOne(this.issuer).changeWallet(-(price*volume));
            } else {
                if (!this.get("soldByCompany")) {
                    console.log("Receiving $", this.orderValue(volume), "for sale of ",volume, "stocks of", this.get("ticker"));
                    User.findOne(this.issuer).changeWallet(this.orderValue(volume));
                }
            }
            
            this.inc("_matched", volume);
            
            if (this.get("_matched") >= this.get("_volume")) {
                this.set("completed", true);
            }
            this.save();
        },
        
        findMatching: function () {
            console.log("Finding matching order of", this.get("ticker"), "x", this.get("_volume"), "at", this.get("price"));
            
            if (this.orderType === "buy") {
                var matchingOrders = Order.find({
                    orderType: "sell",
                    ticker: this.get("ticker"),
                    price: { $lte: this.get("price") },
                    completed: false
                }, {
                    sort: {
                        // TODO fix this
                        createdAt: 1,
                        price: 1
                    }
                });
            } else {
                var matchingOrders = Order.find({
                    orderType: "buy",
                    ticker: this.get("ticker"),
                    price: { $gte: this.get("price") },
                    completed: false
                }, {
                    sort: {
                        // TODO fix this
                        createdAt: 1,
                        price: 1
                    }
                });
            }
            let need = this.get("_volume");
            _.each(matchingOrders.fetch(), (o, i) => {
                if (need === 0) {
                    return;
                } else if (need < 0) {
                    throw Meteor.Error("Need is less than 0!!");
                }
                let price = o.get("price");
                console.log(o.get("volume"), "at $", o.get("price"), "matches");
                if (o.get("volume") > need) {
                    this.matched(need, price);
                    o.matched(need, price);
                    need -= need;
                } else {
                    need -= o.get("volume");
                    this.matched(o.get("volume"), price);
                    o.matched(o.get("volume"), price);
                }
            });
        }
    }
});