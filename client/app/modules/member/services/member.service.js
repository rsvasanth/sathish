(function () {
  'use strict';
  angular
    .module('com.module.member')
    .service('MemberService', function ($state, CoreService, Member,Country,Package,Community, gettextCatalog) {


      this.getCountry = function () {
        return Country.find({}).$promise;
      };
       this.getPackage = function () {
         return Package.find({}).$promise;
       };

      this.getCommunity = Community.find({}).$promise;
      
         this.getMembers = function () {
              return Member.find({}).$promise;
            };

      this.find = function () {
        return Member.find().$promise;
      };

      this.findById = function (id) {
        return Member.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (member) {
        return Member.upsert(member).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Member saved'),
              gettextCatalog.getString('Your meber is safe with us!')
            );
          })
          .catch(function (err) {
              $state.go('^.');
            CoreService.toastError(
              gettextCatalog.getString('Error saving meber '),
              gettextCatalog.getString('This meber could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Member.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Member deleted'),
                gettextCatalog.getString('Your meber is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting meber'),
                gettextCatalog.getString('Your meber is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };



    });

})();
