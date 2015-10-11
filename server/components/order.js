Order.extend({
    events: {
        beforeInsert: function (e) {
            console.log("Before insert", this , e);
            
            if (this.get("soldByCompany")) {
                return;
            }
            
            let volume = this.get("_volume")
            
            if (this.get("orderType") === "buy") {
                User.findOne(this.get("issuer")).changeWallet(-this.orderValue());
            } else {
                let stocks = Stock.find({ owner: this.get("issuer") }).fetch();
                console.log("Stocks:", stocks);
                let stockCount = _.reduce(stocks, (s) => { return s.volume; }, 0);
                
                if (stockCount < volume) {
                    // Not enough stock to sell
                    e.preventDefault();
                    return;
                } else {
                    let removed = 0;
                    _.some(stocks, (s) => {
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
                }
            }
        },
        
        afterInsert: function (e) {
            console.log("After insert", this , e);
            this.findMatching();
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
                console.log("Matching", o);
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