
const baseGrouop = FlowRouter.group({
    
});

BlazeLayout.setRoot('body');


FlowRouter.route("/", {
    action: () => {
        BlazeLayout.render("baseLayout", { content: "home" });
    }
});


FlowRouter.route("/indexes", {
    action: () => {
        BlazeLayout.render("baseLayout", { content: "indexes" });
    }
});

FlowRouter.route("/companies", {
    action: () => {
        BlazeLayout.render("baseLayout", { content: "companies" });
    }
});

FlowRouter.route("/companies/:ticker", {
    action: () => {
        BlazeLayout.render("baseLayout", { content: "company" });
    }
});

FlowRouter.route("/traders", {
    action: () => {
        BlazeLayout.render("baseLayout", { content: "traders" });
    }
});


FlowRouter.route("/mypage", {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: () => {
        BlazeLayout.render("baseLayout", { content: "mypage" });
    }
});