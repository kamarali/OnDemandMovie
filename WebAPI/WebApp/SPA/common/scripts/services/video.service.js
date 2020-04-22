(function (app) {
    'use strict';
    app.value('redirectToUrlAfterLogin', { url: '#/home' });
    app.factory('videoService', videoService);
    videoService.$inject = ['$http', '$q', '$rootScope', 'appSettings', 'redirectToUrlAfterLogin', '$window'];

    function videoService($http, $q, $rootScope, appSettings, redirectToUrlAfterLogin, $window) {

        var service = this;

        service.save = function (video) {
            var deferred = $q.defer();
            var tmpData = {};
            console.log(video);
            var $url = appSettings.apiBaseUri + 'api/data/createvideo';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    selectedCategory: video.selectedCategory,
                    name: video.name,
                    description: video.description,
                    userId: video.createdUserId,
                    createdBy: video.createdBy
                }
            }).then(function (response) {
                deferred.resolve(response);

            }).catch(function (err) {

                if ((err.status !== 200) && _authentication.isAuth) {
                    service.logout();
                }
                deferred.reject(err);
            });

            return deferred.promise;
        };

        service.update = function (video) {
            var deferred = $q.defer();
            console.log(video);
            var $url = appSettings.apiBaseUri + 'api/data/updatevideo';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    id: video.id,
                    selectedCategory: video.selectedCategory,
                    name: video.name,
                    description: video.description,
                    userId: video.updatedUserId,
                    updatedBy: video.updatedBy
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200) && _authentication.isAuth) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        }; 

        service.checkVideoExist = function (name) {
            var deferred = $q.defer();
            console.log(name);
            var $url = appSettings.apiBaseUri + 'api/data/checkVideo';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    name: name
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200) && _authentication.isAuth) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        }; 

        service.delete = function (videoId) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/data/removeVideo';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    id: videoId
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200)) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.init = function () {
            if ($window.sessionStorage["TokenInfo"]) {
                tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
            }
        }

        this.init();

        return service;
    }

    app.factory('categoryService', categoryService);
    categoryService.$inject = ['$http', '$q', '$rootScope', 'appSettings', 'redirectToUrlAfterLogin', '$window'];

    function categoryService($http, $q, $rootScope, appSettings, redirectToUrlAfterLogin, $window) {

        var service = this;

        service.save = function (category) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/data/createCategory';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    name: category.name,
                    createdBy: category.createdBy,
                    userId: category.createdUserId
                }
            }).then(function (response) {
                deferred.resolve(response);

            }).catch(function (err) {

                if ((err.status !== 200) ) {
                    service.logout();
                }
                deferred.reject(err);
            });

            return deferred.promise;
        };

        service.checkCategory = function (name) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/data/checkCategory';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    name: name,
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200)) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.update = function (category) {
            var deferred = $q.defer();
            console.log(category);
            var $url = appSettings.apiBaseUri + 'api/data/updateCategory';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    name: category.name,
                    id: category.id,
                    updatedBy: category.updatedBy,
                    userId: category.createdUserId
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200)) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        };


        service.delete = function (categoryId) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/data/removeCategory';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    id: categoryId
                }
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                if ((err.status !== 200)) {
                    service.logout();
                }
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.init = function () {
            if ($window.sessionStorage["TokenInfo"]) {
                tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
            }
        }

        this.init();

        return service;
    }

})(angular.module('common.modules'));