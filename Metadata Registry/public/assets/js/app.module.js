angular.module('mainApp', [
    'appRoutes',
    'ngMaterial',
    'search',
    'create',
    'mainServices',
    'mainControllersModule'
])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });