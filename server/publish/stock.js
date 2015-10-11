
Meteor.publish("stocks", function (opts) {
    let query = {};
    if (opts.ident) {
        let u = User.findOne({
            "profile.ident": opts.ident
        });
        query.owner = u.get("_id");
    }
    console.log(query);
    return Stock.find(query);
});