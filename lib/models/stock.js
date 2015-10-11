Stock = Astro.Class({
    name: "stock",
    collection: new Mongo.Collection("stock"),
    
    fields: {
        owner: {
            type: "string"
        },
        ticker: {
            type: "string"
        },
        volume: {
            type: "string"
        },
        buyPrice: {
            type: "number"
        }
    }
});
