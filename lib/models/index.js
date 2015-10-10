Index = Astro.Class({
    name: "index",
    collection: new Mongo.Collection("index"),
    
    fields: {
        name: {
            type: "string"
        },
        ident: {
            type: "string"
        },
    },
    
    
    methods: {
        totalValue: function () {
            return Math.floor(Math.random() * 10000);
        }
    }
});