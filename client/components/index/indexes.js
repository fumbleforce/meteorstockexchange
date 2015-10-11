Template.indexes.onCreated(function () {
    Subs.subscribe("index", {});
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

Template.listedIndex.onCreated(function () {

});

Template.listedIndex.onRendered(function () {

});

Template.listedIndex.helpers({

});

Template.listedIndex.events({
    "click .index": function (e) {
        let ident = this.ident;
        FlowRouter.go("/indexes/"+ident);
    },
});