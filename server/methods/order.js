Meteor.methods({
    "orders/create": function (orderData) {
        
        // TODO veryfiy things here, yadda yadda
        
        Order.insert(orderData);
    }
});