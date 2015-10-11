Company = Astro.Class({
    name: "company",
    collection: new Mongo.Collection("company"),
    
    fields: {
        name: {
            type: "string"
        },
        founder: {
            type: "string"
        },
        ticker: {
            type: "string"
        },
        description: {
            type: "string",
        },
        phrase: {
            type: "string"
        }
    },
    
    methods: {
        lastPrice: function () {
            let h = PriceHistory.findOne({ ticker: this.get("ticker") });
            if (!_.isUndefined(h)) {
                return h.last;
            }
            return -1;
        }
    }
});