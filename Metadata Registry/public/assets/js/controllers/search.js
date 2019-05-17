angular.module('search', [])
    .controller('searchCtrl', function (Search, $scope, $timeout, $state) {
        var app = this;
        $scope.results = [1, 2, 3, 4, 5, 6, 7];
        

        
        app.search = function (query) {
            console.log(app.query);
            if (app.query.payload == '' || app.query.payload == null || app.query.payload == ' ') {
                app.successMsg = false;
                app.modalH = 'Error'; // Set header
                app.modalC = 'Invalid Query. Please try again <br> ....Redirecting to Home Page'; // Set body
                var myEl = angular.element(document.querySelector('#searchModal'));
                myEl.addClass('is-active'); // Open modal
                // Give user 10 seconds to make a decision 'yes'/'no'
                $timeout(function () {
                    $location.path('/'); // Redirect to home
                    app.metadata = ''; // Clear login form
                    app.successMsg = false; // CLear success message
                    app.modalH = ''
                    app.modalC = ''
                    myEl.removeClass('is-active'); // Hide modal once criteria met
                }, 1500);

            } else {
                app.results = [];
                Search.getResults(app.query).then(function (data) {
                    app.successMsg = data.data.success;
                    if (data.data.success) {
                        $timeout(function () {
                            $state.go('search'); // Redirect to home
                            
                            app.results = data.data.data;
                            app.successMsg = false; // CLear success message
                            app.query.payload= '';
                        }, 1000);



                    } else {

                        app.modalH = 'Error'; // Set header
                        app.modalC = data.data.message + ' ....Redirecting to Home Page'; // Set body
                        var myEl = angular.element(document.querySelector('#searchModal'));
                        myEl.addClass('is-active'); // Open modal
                        // Give user 10 seconds to make a decision 'yes'/'no'
                        $timeout(function () {
                            $location.path('/'); // Redirect to home
                            app.metadata = ''; // Clear login form
                            app.successMsg = false; // CLear success message
                            app.modalH = ''
                            app.modalC = ''
                            myEl.removeClass('is-active'); // Hide modal once criteria met
                        }, 2500);

                    }
                });
            }

        };

    });