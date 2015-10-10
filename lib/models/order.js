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
            type: "date",
            immutable: true
        },
        time: {
            type: "string",
            transient: true
        }
    },
    
    behaviors: {
        timestamp: {
            createdFieldName: 'createdAt'
        }
    },
    
    events: {
        afterInit: function () {
            this.set("time", moment(this.createdAt).fromNow());
        }
    }
});

Order.findMatchingBuyers = function (order) {
    let matchingOrder = Order.find({
        orderType: "buy",
        stock: doc.stock
    }, {
        sort: {
            createdAt: 1
        }
    });
};

Order.findMatchingSellers = function (order) {
    
};