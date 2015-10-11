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
    
    Order.insert({
        ticker: ticker,
        _volume: 1000000,
        price: Math.floor(Math.random()*100),
        orderType: "sell",
        issuer: ticker,
        soldByCompany: true,
    })
};

Company.reSeed = (count) => {
    Company.remove({});
    Order.remove({});
    Stock.remove({});
    
    if (!count) {
        count = 20;
    }
    
    while (Company.find().count() < count) {
        Company.generate();
    }
};