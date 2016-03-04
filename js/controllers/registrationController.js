app.controller('RegistrationController',
    [
        'authFactory',
        RegistrationController
    ]);

function RegistrationController(authFactory) {
    var rc = this;

    rc.login = function() {
        authFactory.login(rc.user);
    };

    rc.logout = function () {
        authFactory.logout();
    };

    rc.register = function() {
        authFactory.register(rc.user);
    };
}