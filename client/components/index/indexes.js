Template.indexes.onCreated(function () {
    Meteor.subscribe("index", {});
});

Template.indexes.onDestroyed(function () {

});

Template.indexes.onRendered(function () {

});

Template.indexes.helpers({
    indexes: () => {
        return Index.find();
    }
});

Template.index.onCreated(function () {

});

Template.index.onRendered(function () {

});

Template.index.helpers({

});

Template.index.events({
    "click .index": function (e) {
        let ident = this.ident;
        FlowRouter.go("/indexes/"+ident);
    },
});