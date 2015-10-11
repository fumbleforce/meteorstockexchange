Template.mypage.onCreated(function () {
    Meteor.subscribe("myStocks");
});

Template.mypage.onDestroyed(function () {

});

Template.mypage.onRendered(function () {

});

Template.mypage.helpers({
    ownedStocks: () => {
        return Stock.find();
    }
});

Template.mypage.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});