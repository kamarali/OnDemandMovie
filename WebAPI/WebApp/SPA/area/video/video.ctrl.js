app.controller('videoCtrl', videoCtrl);
videoCtrl.$inject = ['$timeout', '$state', '$scope', '$rootScope', '$stateParams', '$window', 'videoService', 'homeService'];

function videoCtrl($timeout, $state, $scope, $rootScope, $stateParams, $window, videoService, homeService) {
    var ctrl = this;
    ctrl.categories = {};
    ctrl.allVideos = {};
    ctrl.user = {};
    ctrl.video = {};
    ctrl.updateVideo = {};
    ctrl.compareVideo = {};
    ctrl.rowNumber = -1;
    ctrl.setVideoId = 0;

    ctrl.getAllCategories = function () {
        homeService.getAllCategories().then(function (response) {
            ctrl.categories = response.data;
            ctrl.video.selectedCategory = 0;
        }).catch(function (err) {
            ctrl.errorFunction(err, 'getAllCategories');
        });
    };

    ctrl.save = function () {
        console.log('save...');
        ctrl.video.createdUserId = ctrl.user.userId;
        ctrl.video.createdBy = ctrl.user.email;
        ctrl.checkVideoAndSave();
        
    };

    ctrl.update = function () {
        console.log('update...');
        ctrl.updateVideo.updatedUserId = ctrl.user.userId;
        ctrl.updateVideo.updatedBy = ctrl.user.email;        
        videoService.update(ctrl.updateVideo).then(function (response) {
            ctrl.getAllVideos();
        }).catch(function (err) {
            ctrl.errorFunction(err, 'update');
        });
    };

    ctrl.checkVideoAndSave = function () {
        videoService.checkVideoExist(ctrl.video.name).then(function (response) {
            if (response.data == true) {
                videoService.save(ctrl.video).then(function (response) {
                    ctrl.getAllVideos();
                    ctrl.video = {};
                }).catch(function (err) {
                    ctrl.errorFunction(err, 'save');
                });
            }
            else {
                console.log('Video already exist');
            }
        }).catch(function (err) {
            ctrl.errorFunction(err, 'save');
        });
    }

    ctrl.goHome = function () {
        $state.go('Home');
    };

    ctrl.doLogOutFromApp = function () {
        $state.go('Logout');
        ctrl.user = {};
        $window.sessionStorage.removeItem('user');
    };

    ctrl.getAllVideos = function () {
        homeService.getVideosByCategory(0).then(function (response) {
            ctrl.allVideos = response.data;
            console.log(ctrl.allVideos);
        }).catch(function (err) {
            ctrl.errorFunction(err, 'getAllVideos');
        });
    };

    ctrl.errorFunction = function (err, errorLocation) {
        console.log('Error Occured in: ' + errorLocation);
        console.log(err);
    };

    ctrl.init = function () {       
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.checkRoles();
        ctrl.getAllCategories();
        ctrl.getAllVideos();
        ctrl.video.selectedCategory = 0;
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

    ctrl.detailView = function (index, video) {
        ctrl.rowNumber = index;
        ctrl.updateVideo = angular.copy(video);
        ctrl.compareVideo = video;
        ctrl.updateVideo.selectedCategory = ctrl.updateVideo.category;
    };

    ctrl.removeVideo = function () {
        videoService.delete(ctrl.setVideoId).then(function (response) {
            ctrl.getAllVideos();
        }).catch(function (err) {
            $state.go('login');
        });
    };

    ctrl.setRemoveVideo = function (videoId) {
        ctrl.setVideoId = videoId;
    };

    ctrl.init();
};