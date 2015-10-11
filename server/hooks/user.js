User.getCollection().after.insert(function (userId, doc) {
    let ident = this._id.slice(0, 6);
    let set = {}
    set["profile.ident"] = ident;
    
    if (doc.profile.isBot) {
        set["cash"] = 10000000;
    } 
    
    User.getCollection().update(this._id, {
        $set: set
    });
});