AccountsTemplates.configure({
    // Behavior
    confirmPassword: false,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/mypage',
    redirectTimeout: 4000,

    // Hooks
    //onLogoutHook: myLogoutFunc,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "rocket icon"
      },
      /*
      title: {
          forgotPwd: "Recover Your Password"
      },
      */
    },
});

AccountsTemplates.configure({
    defaultLayout: 'baseLayout',
    defaultLayoutRegions: {},
    defaultContentRegion: 'content'
});

AccountsTemplates.configureRoute('signIn');

/*
AccountsTemplates.addField({
    _id: 'displayName',
    type: 'number',
    displayName: "Trader name",
});
*/