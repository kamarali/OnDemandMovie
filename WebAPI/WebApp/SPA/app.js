var data = {};
data.apiBaseUri = 'http://localhost:51793/';

var app = angular.module('App', ['common.modules'])
    .constant('appSettings', data);

app.config(function ($stateProvider, $locationProvider,
    $urlRouterProvider) {
    $stateProvider
        .state('Home', {
            url: '/home',
            templateUrl: "/SPA/common/View/home.html"
        })
        .state('Login', {
            url: '/login',
            templateUrl: "/SPA/common/View/login.html"
        })
        .state('Logout', {
            url: '/logout',
            templateUrl: "/SPA/common/View/logout.html"
        })
        .state('AddVideo', {
            url: '/addVideo',
            templateUrl: "/SPA/area/video/addVideo.html"
        })
        .state('AddCategory', {
            url: '/addCategory',
            templateUrl: "/SPA/area/category/addCategory.html"
        })
        .state('Register', {
            url: '/register',
            templateUrl: "SPA/common/View/register.html"
        })
        .state('Report', {
            url: '/report',
            templateUrl: "SPA/area/reports/reports.html"
        })
        .state('User', {
            url: '/user',
            templateUrl: "/SPA/common/View/userList.html"
        });
    $urlRouterProvider.otherwise("/login");
});


app.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

app.directive("ngConfirmClick", [
    function () {
        return {
            priority: -1,
            restrict: "A",
            link: function (scope, element, attrs) {
                element.bind("click", function (e) {
                    var message;
                    message = attrs.ngConfirmClick;
                    if (message && !confirm(message)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        };
    }
]);