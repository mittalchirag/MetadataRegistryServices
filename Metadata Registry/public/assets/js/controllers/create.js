angular.module('create', ['ngFileUpload'])

    .controller('formCtrl', function (Create, $timeout, $location, $scope, Storage, Auth) {
        var app = this;
        app.templateLoading = true;
        app.errorMsg = false;
        app.successMsg = false;
        app.td = false;
        app.template = null;
        app.modalHead = undefined; // Clear modalHead on startup
        app.modalContent = undefined; // Clear modalContent on startup
        app.hideButton = false; // Clear hideButton on startup
        app.username= '';

        app.file = undefined;
        $scope.uploadFiles = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
        }
        app.authData= {};
        app.getTemplate = function (type) {
            app.authData.itemType = app.template.type;
            app.authData.request = 'create';
            Auth.authorize(app.authData).then(function(data){
                if(data.data.success){
                    Auth.getUser().then(function (data) {
                        app.username = data.data.username;            
                    });
                    Create.getTemplate(app.template).then(function (data) {
                        if (data.data.success) {
                            app.templateLoading = false; // Stop bootstrap loading icon
                            app.td = data.data.template;
        
                        } else if (!data.data.success) {
                            // Check if the user's account is expired
                            app.errorMsg = data.data.message;
        
                        }
                    });
                }else{
                    app.modalHead = 'Error'; // Set header
                    app.modalContent = data.data.message + ' .... Redirecting to Home'; // Set body
                    var myEl = angular.element(document.querySelector('#creationModal'));
                    myEl.addClass('is-active'); // Open modal
                    // Give user 10 seconds to make a decision 'yes'/'no'
                    $timeout(function () {
                        $location.path('/'); // Redirect to home
                        app.template.type = ''; // Clear login form
                        app.successMsg = false; // CLear success message
                        app.modalHead = '';
                        app.modalContent = '';
                        myEl.removeClass('is-active'); // Hide modal once criteria met
                    }, 2500);
                }
            })
            
        }
        app.createMetadata = function (metadata) {
            
            app.metadata.type= app.template.type;
            app.metadata.author= app.username;
            if (app.template.type == 'blood') {
                
                app.metadata.title = 'Blood Test Report';
            } else if (app.template.type == 'ecg') {
                app.metadata.title = 'ECG Test Report';
            }
            console.log(app.metadata);
            Create.sendMetadata(app.metadata).then(function (data) {
                app.successMsg = data.data.success;
                if (data.data.success) {
                    app.modalHead = 'Success'; // Set header
                    app.modalContent = data.data.message + ' .... Redirecting to Home'; // Set body
                    var myEl = angular.element(document.querySelector('#creationModal'));
                    myEl.addClass('is-active'); // Open modal
                    // Give user 10 seconds to make a decision 'yes'/'no'
                    $timeout(function () {
                        $location.path('/'); // Redirect to home
                        app.metadata = ''; // Clear login form
                        app.successMsg = false; // CLear success message
                        app.modalHead = '';
                        app.modalContent = '';
                        myEl.removeClass('is-active'); // Hide modal once criteria met
                    }, 2500);



                } else {
                    app.modalHead = 'Error'; // Set header
                    app.modalContent = data.data.message + ' ....Redirecting to Home'; // Set body
                    var myEl = angular.element(document.querySelector('#creationModal'));
                    myEl.addClass('is-active'); // Open modal
                    // Give user 10 seconds to make a decision 'yes'/'no'
                    $timeout(function () {
                        $location.path('/'); // Redirect to home
                        app.metadata = ''; // Clear login form
                        app.successMsg = false; // CLear success message
                        app.modalHead = '';
                        app.modalContent = '';
                        myEl.removeClass('is-active'); // Hide modal once criteria met
                    }, 2500);

                }
            });
        }
    });