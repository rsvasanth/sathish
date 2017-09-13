(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:home
   * @description
   * # home
   */
  angular
    .module('com.module.member')
    .directive('photoFile', ['$parse', function($parse){
    	return {
    		restrict: 'A',
    		link: function(scope, element, attrs){
    			var model = $parse(attrs.photoFile);
    			var modelSetter = model.assign;

    			element.bind('change', function(){
    				scope.$apply(function(){
    					modelSetter(scope, element[0].files[0]);

    				})
    			})
    		}
    	}
    }])

;


})();
