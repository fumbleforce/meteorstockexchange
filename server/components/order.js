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
                
                issuer.changeWallet(-this.orderValue());
            } else {
                
                let stocks = Stock.find({ owner: this.get("issuer") }).fetch();
                let stockCount = _.reduce(stocks, (mem, s) => {
                    return mem + s.get(volume);
                }, 0);
                
                console.log(issuer.get("profile.name"), "is selling", volume, "of", this.get("ticker"), "and has", stockCount);
                
                if (stockCount < volume) {
                    // Not enough stock to sell
                    console.log("Can't sell this many");
                    e.preventDefault();
                    return;
                } else {
                    
                    let removed = 0;
                    _.each(stocks, (s) => {
                        if (removed >= volume) return;
                        
                        if (removed + s.volume > volume) {
                            let sVol = s.get("volume");
                            s.set("volume", volume - removed);
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
        
        matched: function (volume) {
            console.log("Matched", volume);
            if (this.get("orderType") === "buy") {
                Stock.insert({
                    volume: volume,
                    owner: this.issuer,
                    ticker: this.get("ticker"),
                    buyPrice: this.get("price")
                });
            } else {
                if (!this.get("soldByCompany")) {
                    User.findOne(this.issuer).changeWallet(this.orderValue(volume));
                }
            }
            
            this.set("_matched", this.get("_matched") + volume);
            
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
                    price: { $lte: this.get("price") }
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
                    price: { $gte: this.get("price") }
                }, {
                    sort: {
                        // TODO fix this
                        createdAt: 1,
                        price: 1
                    }
                });
            }
            
            _.each(matchingOrders.fetch(), (o, i) => {
                console.log(o.get("volume"), "at", o.get("price"), "matches");
                if (o.get("volume") > this.get("volume")) {
                    this.matched(this.get("volume"));
                    o.matched(this.get("volume"));
                } else {
                    this.matched(o.get("volume"));
                    o.matched(o.get("volume"));
                    
                }
            });
        }
    }
});