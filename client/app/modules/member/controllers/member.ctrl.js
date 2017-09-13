(function () {
  'use strict';
  angular.module('com.module.member')
  .controller('memberAddCtrl', function ($scope,FileUploader,$state,Member,Country,Community,CoreService, $rootScope,MemberService) {

    $scope.country = [];
    $scope.community = [];
 $scope.chageContribution = function(pac) {
console.log("hello pac:"+ pac);
 };
$scope.previewPhoto =function(event){
var files = event.target.files;
var file = files[files.length-1];
var reader = new FileReader();
reader.onload = function (e) {
  $scope.$apply(function() {
    $scope.photo = e.target.result;
  })
}
reader.readAsDataURL(file);
};
  Country
      .find()
      .$promise
      .then(function(country) {
        $scope.country = country;

      });
      Community
          .find()
          .$promise
          .then(function(community) {
            $scope.community = community;

          });

      $scope.action = 'Add';
      $scope.member = {};
      $scope.isDisabled = false;
     $scope.showthisfield = function(id){
    if(id === 'Couple' || id ==='Family' || id ==='Family+'){
      console.log('check ok');
      return true
    };
     };
     $scope.showthisfieldchild = function(id){
    if( id ==='Family' || id ==='Family+'){
      console.log('check ok');
      return true
    };
     };
     $scope.showthisfieldchild2 = function(id){
    if(  id ==='Family+'){
      console.log('check ok');
      return true
    };
     };
     $scope.nd = new Date();
     $scope.submitForm = function() {


       Member.create({
        created:$scope.nd,
         fullname: $scope.member.fullname,
         partner:  $scope.member.partner,
         child1: $scope.member.child1,
         child2: $scope.member.child2,
         community: $scope.member.community ,
         package: $scope.member.package,
         phone: $scope.member.phone,
          email: $scope.member.email,
         gender: $scope.member.gender,
         nationality: $scope.member.nationality,
         contribution: $scope.member.contribution,
         birthday:  $scope.member.birthday,
         status:  $scope.member.status,
         accountnumber:  $scope.member.accountnumber,
         photo_url:  $scope.photo



           })
           .$promise
           .then(function() {
             $state.go('^.list');
           });
     };



  }).controller('memberEditCtrl',function(
    $scope, FileUploader,  $state,  $q, $stateParams,Member,Country,Community,CoreService,$rootScope, MemberService){

      $scope.country = [];
      $scope.community = [];



  $scope.previewPhoto =function(event){
  var files = event.target.files;
  var file = files[files.length-1];
  var reader = new FileReader();
  reader.onload = function (e) {
    $scope.$apply(function() {
      $scope.photo = e.target.result;
    })
  }
  reader.readAsDataURL(file);
  };
    Country
        .find()
        .$promise
        .then(function(country) {
          $scope.country = country;

        });
        Community
            .find()
            .$promise
            .then(function(community) {
              $scope.community = community;

            });

$scope.action = 'Edit';
$scope.editm = "test edit m";
$scope.member = {};
$scope.showthisfield = function(id){
if(id === 'Couple' || id ==='Family' || id ==='Family+'){
 console.log('check ok');
 return true
};
};
$scope.showthisfieldchild = function(id){
if( id ==='Family' || id ==='Family+'){
 console.log('check ok');
 return true
};
};
$scope.showthisfieldchild2 = function(id){
if(  id ==='Family+'){
 console.log('check ok');
 return true
};
};
$scope.member.community ;
$q
  .all([

  Member.findById({ id: $stateParams.memberId }).$promise
  ])
  .then(function(data) {

    $scope.member = data[0];
    $scope.member.community = data[0].community;

console.log(  $scope.member.community);
  });

$scope.submitForm = function(){
  $scope.member.photo_url = $scope.photo;
  $scope.member.substop_start = $scope.subdate.startDate;
    $scope.member.substop_stop = $scope.subdate.endDate;
  $scope.member
    .$save()
    .then(function(member) {
      $state.go('^.list');
    });
};

  });//add

})();
