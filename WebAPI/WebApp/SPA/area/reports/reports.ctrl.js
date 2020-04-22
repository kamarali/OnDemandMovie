app.controller('reportCtrl', reportCtrl);
reportCtrl.$inject = ['$timeout', '$state', '$scope', '$rootScope', '$stateParams', '$window', 'categoryService', 'homeService'];

function reportCtrl($timeout, $state, $scope, $rootScope, $stateParams, $window, categoryService, homeService) {
    var ctrl = this;
    ctrl.sideNavClass;
    ctrl.mainClass;
    ctrl.trendingVideosList = {};
    ctrl.user = {};
    ctrl.isAdmin = false;
    ctrl.showHamburger;
    ctrl.videoName = [];
    ctrl.videoWatchCount = [];
    ctrl.option = {};
    ctrl.colors = [];

    ctrl.init = function () {
        ctrl.sideNavClass = 'closeSidenav';
        ctrl.mainClass = 'closeMain';
        ctrl.showHamburger = true;
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.checkRoles();
        ctrl.trendingVideos();
        ctrl.option = { legend: { display: true, position: 'right' } };
        ctrl.colors = ['#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6', '#7CDDDD'];
    };


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

    ctrl.goHome = function () {
        $state.go('Home');
    };

    ctrl.doLogOutFromApp = function () {
        $state.go('Logout');
        ctrl.user = {};
        $window.sessionStorage.removeItem('user');
    };

    ctrl.trendingVideos = function () {
        homeService.trendingVideos().then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                ctrl.trendingVideosList = response.data;
                ctrl.getLabelsAndData();
            }
            else {
                ctrl.trendingVideosList = {};
            }
        }).catch(function (err) {
            $scope.global.apiError(err, true);
            $state.go('login');
        });
    };

    ctrl.getLabelsAndData = function () {
        angular.forEach(ctrl.trendingVideosList, function (value, key) {
            //$scope.names.push(value.name);
            ctrl.videoName.push(value.name);
            ctrl.videoWatchCount.push(value.watchCount);
            console.log(value);
            console.log(key);
        });
    };

    ctrl.init();
}