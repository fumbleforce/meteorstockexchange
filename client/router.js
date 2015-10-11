
const baseGrouop = FlowRouter.group({
    
});

BlazeLayout.setRoot('body');


FlowRouter.route("/", {
    name: "front",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "front" });
    }
});


FlowRouter.route("/indexes", {
    name: "indexes",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "indexes" });
    }
});

FlowRouter.route("/companies", {
    name: "companies",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "companies" });
    }
});

FlowRouter.route("/companies/:ticker", {
    name: "company",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "company" });
    }
});

FlowRouter.route("/traders", {
    name: "traders",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "traders" });
    }
});

FlowRouter.route("/traders/:ident", {
    name: "trader",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "trader" });
    }
});
