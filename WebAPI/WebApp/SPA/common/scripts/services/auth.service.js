(function (app) {
	'use strict';
	app.value('redirectToUrlAfterLogin', { url: '#/home' });
	app.factory('authService', authService);
	authService.$inject = ['$http', '$q', '$rootScope', 'appSettings', 'redirectToUrlAfterLogin', '$window'];

	function authService($http, $q, $rootScope,appSettings, redirectToUrlAfterLogin, $window) {

		var service = this;
		service.authentication = {};
		var _authentication = { isAuth: false };
		var userInfo;
		var tokenInfo;

		this.login = function (loginData) {

		    var authData = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
		    //authData = authData + "&client_id=" + localStorageService.get('ClientId').ClientId;

		    var deferred = $q.defer();
		    var tmpData = {};
		    var $url = appSettings.apiBaseUri + 'api/accounts/userlogin';
		    $http({
		        method: 'POST',
		        url: $url,
		        data: { userName: loginData.userName, password: loginData.password }
		    }).then(function (response) {
		        userInfo = {
		            accessToken: response.data.access_token,
		            userName: response.data.userName,
		            refreshToken: response.data.refresh_token
		        };

		        _authentication.isAuth = true;
		        _authentication.userName = loginData.userName;

		        //fill Auth Data for session use and accessibility
		        //service.fillAuthData();

		        deferred.resolve(response);

		    }).catch(function (err) {

		        if ((err.status !== 200) && _authentication.isAuth) {
		            service.logout();
		        }
		        deferred.reject(err);
		    });

		    return deferred.promise;
        };

		
		this.fillAuthData = function () {
		    var authSessionData = '';//localStorageService.get('authorizationTFAData');
		    if (authSessionData) {

		        //Fillin Auth data to be accessible via AuthService only
		        service.authentication = {
		            isAuth: true,
		            id: authSessionData.id,
		            userName: authSessionData.userName,
		            roles: authSessionData.roles	            
		        }
		    }
		}


        this.registerUser = function (registerData) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/registerUser';
            $http({
                method: 'POST',
                url: $url,
                data: {
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    userName: registerData.userName,
                    password: registerData.password,
                    Email: registerData.userEmail
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


        this.getUsers = function () {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/fetchAllUsers';
            $http({
                method: 'POST',
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

        this.getUserRole = function (userId) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/fetchUsersRole';
            $http({
                method: 'POST',
                url: $url,
                data: { userId: userId}
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

        this.giveAdminRole = function (userId) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/giveAdminRole';
            $http({
                method: 'POST',
                url: $url,
                data: { userId: userId }
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

        this.removeAdminRole = function (userId) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/removeAdminRole';
            $http({
                method: 'POST',
                url: $url,
                data: { userId: userId }
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

        this.isInRole = function (userId,role) {
            var deferred = $q.defer();
            var $url = appSettings.apiBaseUri + 'api/accounts/isInRole';
            $http({
                method: 'POST',
                url: $url,
                data: { userId: userId, role: role }
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

		this.init = function () {
			if ($window.sessionStorage["TokenInfo"]) {
				tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
			}
		}

		this.init();

		return service;
	}

})(angular.module('common.modules'));