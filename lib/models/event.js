Event = Astro.Class({
    name: "event",
    collection: new Mongo.Collection("event"),
    
    fields: {
        title: {
            type: "string"
        },
        companyTicker: {
            type: "string"
        },
    }
});