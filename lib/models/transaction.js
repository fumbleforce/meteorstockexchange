Transaction = Astro.Class({
    name: "transaction",
    collection: new Mongo.Collection("transaction"),
    
    fields: {
        transactionType: {
            type: "string",
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
        buyer: {
            type: "string",
        },
        seller: {
            type: "string",
        },
        createdAt: {
            type: "date"
        }
    }
});
