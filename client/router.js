
const baseGrouop = FlowRouter.group({
    
});

BlazeLayout.setRoot('body');


FlowRouter.route("/", {
    name: "home",
    action: () => {
        BlazeLayout.render("baseLayout", { content: "home" });
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


FlowRouter.route("/mypage", {
    name: "",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: () => {
        BlazeLayout.render("baseLayout", { content: "mypage" });
    }
});