var servicesURI ='/api/serivce';
angular.module('mainServices', [])

    .factory('User', function ($http) {
        userFactory = {};

        //User.create(regData)
        userFactory.create = function (regData) {
            regData.action= 'register';
            return $http.post('http://localhost:3030/api/register', regData);
        };
        userFactory.getGroups = function(){
            return $http.get('http://localhost:3030/api/groups');
        }


        return userFactory;
    })

    .factory('Create', function($http){
        createFactory= {};

        createFactory.getTemplate = function(formData){
            formData.action='template';
            return $http.post('http://localhost:3031/api/create/template',formData);
        }
        createFactory.sendMetadata = function(metadata){
            return $http.post('http://localhost:3031/api/create/getdata', metadata);
        }
        return createFactory;
    })

    .factory('Search', function($http){
        searchFactory= {};
         var dataStore = [];

        searchFactory.getResults = function(query){
            return $http.post('http://localhost:3033/api/elastic/search', query).then(function(data){
                dataStore = data;
                return data;
            });

        }
        searchFactory.getData = function(){
            console.log(dataStore);
            return this.dataStore;
        }
        return searchFactory;
    })
    .factory('Storage', function($http){
        storageFactory= {};

        storageFactory.storeMetadata = function(metadata){
            console.log(metadata);
            return $http.post('http://localhost:3032/api/store/data', metadata);
        }
        
        return storageFactory;
    })
    // Factory: Auth handles all login/logout functions	
    .factory('Auth', function ($http, AuthToken) {
        var authFactory = {}; // Create the factory object

        // Function to log the user in
        authFactory.login = function (loginData) {
            loginData.action ='login';
            return $http.post('http://localhost:3030/api/authenticate', loginData).then(function (data) {
                AuthToken.setToken(data.data.token); // Endpoint will return a token to set
                return data;
            });
        };

        authFactory.authorize= function(data){
            return $http.post('http://localhost:3030/api/authorize', data);
        }
        // Function to check if user is currently logged in
        authFactory.isLoggedIn = function () {
            // CHeck if token is in local storage
            if (AuthToken.getToken()) {
                return true; // Return true if in storage
            } else {
                return false; // Return false if not in storage
            }
        };

        // Function to get current user's data
        authFactory.getUser = function () {
            // Check first if user has a token
            if (AuthToken.getToken()) {
                
                return $http.get('http://localhost:3030/api/me'); // Return user's data
            } else {
                $q.reject({ message: 'User has no token' }); // Reject if no token exists
            }
        };

        // Function to logout the user
        authFactory.logout = function () {
            AuthToken.setToken(); // Removes token from local storage
        };

        return authFactory; // Return object
    })

    // Factory: AuthToken handles all token-associated functions
    .factory('AuthToken', function ($window) {
        var authTokenFactory = {}; // Create factory object

        // Function to set and remove the token to/from local storage
        authTokenFactory.setToken = function (token) {
            // Check if token was provided in function parameters
            if (token) {
                $window.localStorage.setItem('token', token); // If so, set the token in local storage
            } else {
                $window.localStorage.removeItem('token'); // Otherwise, remove any token found in local storage (logout)
            }
        };

        // Function to retrieve token found in local storage
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory; // Return factory object
    })

    // Factory: AuthInterceptors is used to configure headers with token (passed into config, app.js file)
    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {}; // Create factory object

        // Function to check for token in local storage and attach to header if so
        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken(); // Check if a token is in local storage
            if (token) config.headers['x-access-token'] = token; //If exists, attach to headers

            return config; // Return config object for use in app.js (config file)
        };

        return authInterceptorsFactory; // Return factory object

    });