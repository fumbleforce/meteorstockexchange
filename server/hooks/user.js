/*
// Add additional fields to the user model on creation
Accounts.onCreateUser(function(options, user) {
    
    user.cash = 100000;
    
    return user;
});

*/

User.getCollection().after.insert(function (userId, doc) {
    let ident = this._id.slice(0, 6);
    console.log("setting", this._id, "to", ident);
    
    User.getCollection().update(this._id, { "profile.ident": ident });
});