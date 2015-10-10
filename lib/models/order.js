Order = Astro.Class({
    name: "order",
    collection: new Mongo.Collection("order"),
    
    fields: {
        orderType: {
            type: "string"
        },
        volume: {
            type: "number"
        },
        price: {
            type: "number"
        },
        stock: {
            type: "string"
        },
        issuer: {
            type: "string",
        },
        createdAt: {
            type: "date"
        }
    }
});
