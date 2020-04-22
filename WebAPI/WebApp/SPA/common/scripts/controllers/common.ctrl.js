
// ROOT CONTROLLER
app.controller('rootCtrl', rootCtrl);
rootCtrl.$inject = ['$timeout', '$state', '$scope', '$rootScope', '$stateParams'];

function rootCtrl($timeout, $state, $scope, $rootScope, $stateParams) {
};



app.controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['$scope', '$rootScope', '$state', '$document', 'homeService', '$window'];

function homeCtrl($scope, $rootScope, $state, $document, homeService, $window) {
    var ctrl = this;
    ctrl.categories = {};
    ctrl.movies = {};
    ctrl.sideNavClass;
    ctrl.mainClass;
    ctrl.trendingVideosList = {};
    ctrl.user = {};
    ctrl.isAdmin = false;

    ctrl.init = function () {
        ctrl.selectedCategory = 0;
        ctrl.getAllCategories();
        ctrl.getVideos();
        ctrl.sideNavClass = 'closeSidenav';
        ctrl.mainClass = 'closeMain';
        ctrl.showHamburger = true;
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'));
        ctrl.checkRoles();
        ctrl.trendingVideos();
    };

    ctrl.checkRoles = function () {
        if (ctrl.user[0].role == 'Admin') {
            ctrl.isAdmin = true;
            ctrl.showHamburger = true;
        }
        else {
            ctrl.isAdmin = false;
            ctrl.showHamburger = false;
        }
    }

    ctrl.openNav = function () {
        ctrl.sideNavClass = 'openSidenav';
        ctrl.mainClass = 'openMain';
        ctrl.showHamburger = false;
    };

    ctrl.closeNav = function () {
        ctrl.sideNavClass = 'closeSidenav';
        ctrl.mainClass = 'closeMain';
        if (ctrl.isAdmin) {
            ctrl.showHamburger = true;
        }
    };

    ctrl.addVideo = function () {
        $state.go('AddVideo');
    };

    ctrl.users = function () {
        $state.go('User');
    };

    ctrl.addCategory = function () {
        $state.go('AddCategory');
    };

    ctrl.addReport = function () {
        $state.go('Report');
    };

    ctrl.goHome = function () {
        $state.go('Home');
    };


    ctrl.getAllCategories = function () {
        homeService.getAllCategories().then(function (response) {
            ctrl.categories = response.data;
            ctrl.user = JSON.parse($window.sessionStorage.getItem('user'));
            ctrl.checkRoles();
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            $state.go('login');
        });
    };





    ctrl.getVideos = function () {
        homeService.getVideosByCategory(ctrl.selectedCategory).then(function (response) {
            ctrl.movies = response.data;
            console.log(ctrl.movies);
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            $state.go('login');
        });
    };

    ctrl.doLogOutFromApp = function () {
        $state.go('Logout');
        ctrl.user = {};
        $window.sessionStorage.removeItem('user');
    };


    ctrl.watch = function (watchVideo) {
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        watchVideo.userId = ctrl.user.userId;
        watchVideo.createdBy = ctrl.user.email;
        console.log(watchVideo);
        ctrl.trendingVideos();
        homeService.addWatchHistory(watchVideo).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            $state.go('login');
        });
    }

    ctrl.trendingVideos = function () {
        homeService.trendingVideos().then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                ctrl.trendingVideosList = response.data;
            }
            else {
                ctrl.trendingVideosList = {};
            }
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            $state.go('login');
        });
    }

    ctrl.init();
};

app.controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', '$rootScope', '$state', '$document', '$window', 'authService'];

function loginCtrl($scope, $rootScope, $state, $document, $window, authService) {

    $document[0].title = 'On Demand Video';

    var ctrl = this;
    ctrl.loginData = {
        userName: "",
        password: "",
        TFA: ""
    };

    ctrl.init = function () {
        ctrl.showExternalLanding = 0;
        ctrl.showLogin = 1;
        ctrl.showRegister = 0;
        ctrl.userStatus = "";
        ctrl.resp = {};
        ctrl.user = {};
        ctrl.defType = undefined;
    };

    ctrl.init();

    ctrl.pwResetData = {
        userName: ""
    };

    ctrl.userValidated = false;
    ctrl.showForgot = 0;

    ctrl.registerSuccess = false;

    ctrl.register = function () {
        ctrl.registerSuccess = true;
        $state.go('Register');
    };

    //LOGIN
    ctrl.doLogin = function () {
        authService.login(ctrl.loginData).then(function (response) {
            ctrl.userValidated = true;
            ctrl.resp = response.data;
            ctrl.fillAuthData(ctrl.resp.id);
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.fillAuthData = function (userId) {
        authService.getUserRole(userId).then(function (response) {
            ctrl.user = response.data;
            $window.sessionStorage.setItem('user', JSON.stringify(ctrl.user));
            ctrl.navigateHome();
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.navigateHome = function () {
        if (ctrl.userValidated) {
            console.log(ctrl.user);
            $state.go('Home');
        }
    };

};

app.controller('registerCtrl', registerCtrl);
registerCtrl.$inject = ['$scope', '$rootScope', '$state', '$document', 'authService'];

function registerCtrl($scope, $rootScope, $state, $document, authService) {

    var ctrl = this;
    ctrl.registerData = {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        userEmail: "",
    };
    ctrl.user = {};
    ctrl.redirectPending = false;
    ctrl.registerSuccess = false;

    ctrl.doRegister = function () {
        authService.registerUser(ctrl.registerData).then(function (response) {
            ctrl.user = response.data;
            console.log(ctrl.user);
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('Login');
            }
        });
        $state.go('Login');
    };

    ctrl.giveAdminRole = function (userId) {
        authService.giveAdminRole(userId).then(function (response) {
            ctrl.getUsers();
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.login = function () {
        $state.go('Login');
    };
};


app.controller('userCtrl', userCtrl);
userCtrl.$inject = ['$scope', '$rootScope', '$state', '$document','$window', 'authService'];

function userCtrl($scope, $rootScope, $state, $document, $window, authService) {

    var ctrl = this;
    ctrl.user = {};

    ctrl.init = function () {
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.checkRoles();
        ctrl.getUsers();
    }

    ctrl.checkRoles = function () {
        if (ctrl.user.role == 'Admin') {
            ctrl.isAdmin = true;
            ctrl.showHamburger = true;
        }
        else {
            ctrl.isAdmin = false;
            ctrl.showHamburger = false;
        }
    }
    ctrl.openNav = function () {
        ctrl.sideNavClass = 'openSidenav';
        ctrl.mainClass = 'openMain';
        ctrl.showHamburger = false;
    };
    ctrl.closeNav = function () {
        ctrl.sideNavClass = 'closeSidenav';
        ctrl.mainClass = 'closeMain';
        if (ctrl.isAdmin) {
            ctrl.showHamburger = true;
        }
    };
    ctrl.addVideo = function () {
        $state.go('AddVideo');
    };
    ctrl.users = function () {
        $state.go('User');
    };
    ctrl.addCategory = function () {
        $state.go('AddCategory');
    };
    ctrl.addReport = function () {
        $state.go('Report');
    };

    ctrl.getUsers = function () {
        authService.getUsers().then(function (response) {
            ctrl.user = response.data;
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.getUserRole = function (userId) {
        authService.getUserRole(userId).then(function (response) {
            ctrl.user = response.data;
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.giveAdminRole = function (userId) {
        authService.giveAdminRole(userId).then(function (response) {
            ctrl.getUsers();
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.removeAdminRole = function (userId) {
        authService.removeAdminRole(userId).then(function (response) {
            ctrl.getUsers();
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.isInRole = function (userId, role) {
        authService.isInRole(userId, role).then(function (response) {
            ctrl.user = response.data;
            console.log(ctrl.user);
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            if (appSettings.authAuthMode !== "SAML_AZURE") {
                $state.go('login');
            }
        });
    };

    ctrl.goHome = function () {
        $state.go('Home');
    };

    ctrl.doLogOutFromApp = function () {
        $state.go('Logout');
        ctrl.user = {};
        $window.sessionStorage.removeItem('user');
    };
    ctrl.init();
};






