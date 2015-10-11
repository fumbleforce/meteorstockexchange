Order = Astro.Class({
    name: "order",
    collection: new Mongo.Collection("order"),
    
    fields: {
        orderType: {
            type: "string"
        },
        _volume: {
            type: "number"
        },
        _matched: {
            type: "number",
            default: 0
        },
        volume: {
            type: "number",
            transient: true,
        },
        price: {
            type: "number"
        },
        ticker: {
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
        },
        completed: {
            type: "boolean",
            default: false
        },
        soldByCompany: {
            type: "boolean",
            default: false
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
            this.set("volume", this.get("_volume") - this.get("_matched"));
        },
        
        beforeInsert: function (e) {
            console.log("Before order inseert", this.get("_volume"));
            
            if (this.get("_volume") === 0) {
                console.log("selling at volume 0");
                e.preventDefault();
                return;
            }
        }
    }
});

