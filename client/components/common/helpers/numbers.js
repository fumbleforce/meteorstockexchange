
// Format numbers prettily using
// numeral:numeral
Template.registerHelper("dollar", function (n) {
    if (isNaN(n)) {
        return "NaN";
    }
    return numeral(n).format('($0,0.00)');
});