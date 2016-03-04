app.factory('authFactory', [
    '$rootScope',
    '$location',
    '$firebaseAuth',
    '$firebaseObject',
    'FIREBASE_URL',
    authFactory
]);

function authFactory($rootScope, $location, $firebaseAuth, $firebaseObject, FIREBASE_URL) {
    var factory = {
        login: login,
        logout: logout,
        requireAuth: requireAuth,
        register: register
    };
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function (authUser) {
        if (authUser) {
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
        }
    });

    function login(user) {
        auth.$authWithPassword({
            email: user.email,
            password: user.password
        }).then(function (regUser) {
            $location.path('/success');
        }).catch(function (error) {
            $rootScope.loginMessage = error.message;
        });
    } // Login

    function logout() {
        return auth.$unauth();
    } // Logout

    function requireAuth() {
        return auth.$requireAuth();
    } // Require Auth

    function register(user) {
        auth.$createUser({
            email: user.email,
            password: user.password
        }).then(function(regUser) {
            var regRef = new Firebase(FIREBASE_URL + 'users')
                .child(regUser.uid).set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }); // User info

            factory.login(user);
        }).catch(function(error) {
            $rootScope.registerMessage = error.message;
        }); // Create User
    } // Register

    return factory;
}