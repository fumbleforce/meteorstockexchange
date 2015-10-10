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


if (Meteor.isServer) {
    
    Company.generate = () => {
        let name = faker.company.companyName();
        let ticker = name.replace("'", "").replace(/ /g, "").slice(0, 4).toUpperCase();
        let founder = faker.name.findName();
        let phrase = faker.company.catchPhrase();
        
        let bs = faker.company.bs();
        
        _.each(_.range(20), () => {
            bs += " " + faker.company.bs() + ".";
        });
        
        
        let description = bs;
        
        Company.insert({
            name: name,
            ticker: ticker,
            description: description,
            founder: founder,
            phrase: phrase
        });
    };
    
    
    
    
    
}