(function (app) {
    'use strict';
    app.value('redirectToUrlAfterLogin', { url: '#/home' });
    app.factory('homeService', homeService);
    homeService.$inject = ['$http', '$q', '$rootScope', 'appSettings', 'redirectToUrlAfterLogin', '$window'];

    function homeService($http, $q, $rootScope, appSettings, redirectToUrlAfterLogin, $window) {

        var service = this;
        var _authentication = {};

        this.getAllCategories = function () {
            var deferred = $q.defer();
            var tmpData = {};
            var $url = appSettings.apiBaseUri + 'api/data/categories';
            $http({
                method: 'GET',
                url: $url
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

        service.init = function () {
            if ($window.sessionStorage["TokenInfo"]) {
                tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
            }
            _authentication.isAuth = true;
        }

        service.getVideosByCategory = function (categoryId) {
            var deferred = $q.defer();
            var tmpData = {};
            var $url = appSettings.apiBaseUri + 'api/data/getVideos';
            $http({
                method: 'GET',
                url: $url,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { categoryId: categoryId }
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

        service.logout = function () {
            console.log('logout');
        }


        service.addWatchHistory = function (watchHistory) {
            var deferred = $q.defer();
            console.log(name);
            var $url = appSettings.apiBaseUri + 'api/data/addWatchHistory';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    id: watchHistory.id,
                    category: watchHistory.category,
                    userId: watchHistory.userId
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



        service.trendingVideos = function () {
            var deferred = $q.defer();
            console.log(name);
            var $url = appSettings.apiBaseUri + 'api/data/trendingVideos';
            $http({
                method: 'POST',
                url: $url,
                data: {  }
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


        service.init();

        return service;
    }

})(angular.module('common.modules'));