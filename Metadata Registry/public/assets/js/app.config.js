var app = angular.module("appRoutes", ['ui.router']);
app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/error');
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "pages/home.html"
        })
        .state("error", {
            url: "/error",
            templateUrl: "pages/error.html"
        })
        .state("search", {
            url: "/search",
            templateUrl: "pages/search.html",
            authenticated: true
        })
        .state("create", {
            url: "/create",
            templateUrl: "pages/create.html",
            authenticated: true
        })

        .state("manage", {
            url: "/manage",
            templateUrl: "pages/manage.html",
            authenticated: true
        })
        .state("mybookings", {
            url: "/mybookings",
            templateUrl: "app/views/pages/mybookings.html",
            authenticated: true
        })
        .state("courts", {
            url: "/courts",
            templateUrl: "app/views/pages/courts.html",
            authenticated: true
        })
        .state("login", {
            url: "/login",
            templateUrl: "pages/login.html"
        })
        .state("register", {
            url: "/register",
            templateUrl: "pages/register.html"
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.run(["$rootScope", "$state", "Auth", "$location", function ($rootScope, $state, Auth, $location) {
    $rootScope.$on("$stateChangeStart", function (event, toState) {
        if (toState.authenticated == true) {
            if (!Auth.isLoggedIn()) {
                console.log("Authentication is required");
                event.preventDefault();
                $state.transitionTo("login");
            }
        } else if (toState.authenticated == false) {
            if (Auth.isLoggedIn()) {
                event.preventDefault();
                $state.transitionTo("courts");
            }
        }
    });
}]);
