PriceHistory = Astro.Class({
    name: "priceHistory",
    collection: new Mongo.Collection("priceHistory"),
    
    fields: {
        ticker: "string",
        prices: {
            type: "array",
            default: function () {
                return []
            }
        },
        last: {
            type: "number"
        }
    }
});