(function () {
  'use strict';
  angular
    .module('com.module.member')
    .provider('modalState', ['$stateProvider', function($stateProvider) {
      var provider = this;
      this.$get = function() {
        return provider;
      }
      this.state = function(stateName, options) {
        var modalInstance;
        options.onEnter = onEnter;
        options.onExit = onExit;
        if (!options.resolve) options.resolve = [];
        var resolveKeys = angular.isArray(options.resolve) ? options.resolve : Object.keys(options.resolve);
        $stateProvider.state(stateName, omit(options, ['template', 'templateUrl', 'controller', 'controllerAs']));
        onEnter.$inject = ['$modal', '$state', '$timeout'].concat(resolveKeys);
        function onEnter($modal, $state, $timeout) {
          options.resolve = {};
          for (var i = onEnter.$inject.length - resolveKeys.length; i < onEnter.$inject.length; i++) {
            (function(key, val) {
              options.resolve[key] = function() { return val }
            })(onEnter.$inject[i], arguments[i]);
          }
          $timeout(function() { // to let populate $stateParams
            modalInstance = $modal.open(options);
            modalInstance.result.finally(function() {
              $timeout(function() { // to let populate $state.$current
                if ($state.$current.name === stateName)
                $state.go(options.parent || '^.list');
              });
            });
          });
        }
        function onExit() {
          if (modalInstance)
          modalInstance.close();
        }
        return provider;
      }

    }])
    .config(function ($stateProvider) {
      $stateProvider

        .state('app.member', {
          abstract: true,
          url: '/members',
          templateUrl: 'modules/member/views/main.html'
        })
        .state('app.member.list', {
          url: '',
          templateUrl: 'modules/member/views/list.html',
          controllerAs: 'ctrl',
          controller: function (members) {
            console.log('members', members);
            this.members = members;
          },
          resolve: {
            members: function (MemberService) {
              console.log('members');
              return MemberService.getMembers();
            }
          }
        })
        .state('app.member.add', {
          url: '/add',
          templateUrl: 'modules/member/views/formv1.html',
          controller:'memberAddCtrl'

        })
        .state('app.member.edit', {
          url: '/edit/:memberId',
          templateUrl: 'modules/member/views/form.html',

          controller:'memberEditCtrl'
        })

        .state('app.members.delete', {
          url: '/:memberId/delete',
          template: '',
          controller: function ($stateParams, $state, MemberService) {
            MemberService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }
        })
        .state('app.members.profile', {
          url: '/profile',
          templateUrl: 'modules/member/views/profile.html'

        });
    }).config(['modalStateProvider', function(modalStateProvider) {
    modalStateProvider
    .state('app.member.view', {
      url: '/view/:memberId',
      templateUrl: 'modules/member/views/view.html',
      controllerAs: 'ctrl',
      controller: function (member) {
        this.member = member;
      this.cancel = function () {
console.log("hello close");
 $scope.myModalInstance.close();
    };

      },
      resolve: {
        member: function ($stateParams, MemberService) {
          return MemberService.findById($stateParams.memberId);
        }
      }
    })
  }]);
      function omit(object, forbidenKeys) {
        var prunedObject = {};
        for (var key in object)
          if (forbidenKeys.indexOf(key) === -1)
            prunedObject[key] = object[key];
        return prunedObject;
      }

})();

// //controllerAs: 'ctrl',
// controller: function ($state,uibDateParser, $scope,FileUploader,MemberService,CoreService, member,country,mpackage,community) {
//   this.member = member;
//
//   this.mpackage = mpackage;
//     this.country = country;
//   this.community = community;
//   this.date = new Date();
// this.format = 'yyyy/MM/dd';
//   this.formFields = MemberService.getFormFields('add',country,mpackage,community);
//   this.formOptions = {};
//   this.uploader = new FileUploader({
//     url: CoreService.env.apiUrl + '/containers/files/upload',
//     formData: [
//       {
//         key: 'value'
//       }
//     ]
//   });
//   this.submit = function () {
//     MemberService.upsert(this.member).then(function (err) {
//       if(err){
//           $state.go('^.');
//       }
//       $state.go('^.list');
//     });
//   };
// },
// resolve: {
//
//   mpackage:function (MemberService) {
//     return MemberService.getPackage();
//   },
//   member: function () {
//     return {};
//   },
//   community: function (MemberService) {
//     return MemberService.getCommunity();
//   },
//   country:function (MemberService) {
//     return MemberService.getCountry();
//   }
// }
