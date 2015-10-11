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
            return Math.floor(Math.random()*1000);
        }
    }
});