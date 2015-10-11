UserProfile = Astro.Class({
    name: "UserProfile",
    fields: {
        nickname: "string",
        ident: {
            type: "string",
        },
        isBot: {
            type: "boolean",
            default: false
        }
        /* Any other fields you want to be published to the client */
    },
    
});

UserStatus = Astro.Class({
    name: "UserStatus",
    fields: {
        online: "boolean",
        lastLogin: {
            type: "date",
        },
        idle: "boolean",
        /* Any other fields you want to be published to the client */
    }
});

User = Astro.Class({
    name: "User",
    collection: Meteor.users,
    fields: {
        createdAt: "date",
        username: "string",
        emails: {
            type: "array",
            default: function() {
                return [];
            }
        },
        profile: {
            type: "object",
            nested: "UserProfile",
            default: function() {
                return {};
            }
        },
        status: {
            type: "object",
            nested: "UserStatus",
            default: function() {
                return {};
            }
        },
        
        cash: {
            type: "number",
            default: 100000
        },
        isBot: {
            type: "boolean",
            default: false
        }
    },
    
    methods: {
        
        changeWallet: function (amount) {
            console.log("Changing wallet from", this.get("cash"), "to", this.get("cash") + amount);
            this.set("cash", this.get("cash") + amount);
            this.save();
        }
    }
});

User.current = function () {
    return User.findOne(Meteor.userId());
};


if (Meteor.isServer) {
    User.extend({
        fields: {
            services: "object"
        }
    });
}