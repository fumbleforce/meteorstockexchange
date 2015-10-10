serProfile = Astro.Class({
    name: 'UserProfile',
    fields: {
        nickname: 'string',
        isBot: {
            type: "boolean",
            default: false
        }
        /* Any other fields you want to be published to the client */
    }
});

User = Astro.Class({
    name: 'User',
    collection: Meteor.users,
    fields: {
        createdAt: 'date',
        emails: {
            type: 'array',
            default: function() {
                return [];
            }
        },
        profile: {
            type: 'object',
            nested: 'UserProfile',
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
    }
});

if (Meteor.isServer) {
    User.extend({
        fields: {
            services: 'object'
        }
    });
}