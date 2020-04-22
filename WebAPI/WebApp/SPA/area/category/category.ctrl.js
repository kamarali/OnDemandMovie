app.controller('categoryCtrl', categoryCtrl);
categoryCtrl.$inject = ['$timeout', '$state', '$scope', '$rootScope', '$stateParams', '$window', 'categoryService', 'homeService'];

function categoryCtrl($timeout, $state, $scope, $rootScope, $stateParams, $window, categoryService, homeService) {
    var ctrl = this;
    ctrl.user = {};
    ctrl.categories = {};
    ctrl.updateCategory = {};
    ctrl.compareCategory = {};
    ctrl.addCategories = {};
    ctrl.rowNumber = -1;
    ctrl.doesCategoryExist = false;
    ctrl.setCategoryId = 0;


    ctrl.init = function () {

        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.checkRoles();
        ctrl.getAllCategories();
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

    ctrl.getAllCategories = function () {
        homeService.getAllCategories().then(function (response) {
            ctrl.categories = response.data;
        }).catch(function (err) {
            $state.go('login');
        });
    };

    ctrl.save = function () {
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.addCategories.createdUserId = ctrl.user.userId;
        ctrl.addCategories.createdBy = ctrl.user.email;
        categoryService.save(ctrl.addCategories).then(function (response) {
            ctrl.getAllCategories();
            ctrl.addCategories = {};
        }).catch(function (err) {
            $state.go('login');
        });

    };


    ctrl.checkCategoryAndUpdate = function () {
        ctrl.doesCategoryExist = false;
        categoryService.checkCategory(ctrl.updateCategory.name).then(function (response) {
            ctrl.doesCategoryExist = response.data;
            if (response.data) {
                categoryService.update(ctrl.updateCategory).then(function (response) {
                    ctrl.getAllCategories();
                }).catch(function (err) {
                    $state.go('login');
                });
            }
            else {
                console.log('category already exist');
            }
        }).catch(function (err) {
            $state.go('login');
        });
    };

    ctrl.updateCategoryEntity = function () {
        ctrl.user = JSON.parse($window.sessionStorage.getItem('user'))[0];
        ctrl.updateCategory.createdUserId = ctrl.user.userId;
        ctrl.updateCategory.updatedBy = ctrl.user.email;
        ctrl.checkCategoryAndUpdate(); 
    };

    ctrl.removeCategory = function () {
        categoryService.delete(ctrl.setCategoryId).then(function (response) {
            ctrl.getAllCategories();
        }).catch(function (err) {
            $state.go('login');
        });
    };

    ctrl.setCategory = function (categoryId) {
        ctrl.setCategoryId = categoryId;
    };

    ctrl.goHome = function () {
        $state.go('Home');
    };

    ctrl.doLogOutFromApp = function () {
        $state.go('Logout');
        ctrl.user = {};
        $window.sessionStorage.removeItem('user');
    };

    ctrl.detailView = function (index, category) {
        ctrl.rowNumber = index;
        ctrl.updateCategory = angular.copy(category);
        ctrl.compareCategory = category;
    };

    ctrl.ckeckMaodelChange = function () {
        if (ctrl.updateCategory.name == ctrl.compareCategory.name) { ctrl.isModelChanged = false; }
        else ctrl.isModelChanged = true;
    }

    ctrl.init();
};