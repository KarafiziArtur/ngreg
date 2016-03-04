var app = angular.module('ngRegistration', [
    'ui.router',
    'ngAnimate',
    'firebase'
]);

app.constant('FIREBASE_URL', 'https://angularregister.firebaseio.com/');

app.run(['$rootScope', '$location', firstRun]);

function firstRun($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
        function(event, next, prev, error) {
            if (error == 'AUTH_REQUIRED') {
                $location.path('/login');
            }
        });
}

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', configurateRoutes]);

function configurateRoutes($urlRouterProvider, $stateProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.tpl.html',
            controller: 'RegistrationController as rc'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.tpl.html',
            controller: 'RegistrationController as rc'
        })
        .state('success', {
            url: '/success',
            templateUrl: 'views/success.tpl.html',
            controller: 'SuccessController as sc',
            resolve: {
                currentAuth: function(authFactory) {
                    return authFactory.requireAuth();
                }
            }
        });
}