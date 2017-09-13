'use strict';

module.exports = function(Autotrig) {
  var app =  require('../../server/server');
  var schedule = require('node-schedule');


  Autotrig.observe('after save', function Autotriger(ctx, next) {
console.log("got some new data ! hoo haaa :");

var vdate = ctx.instance.end;

var date = new Date().toDateString();
  if(vdate.toDateString() == date){
    console.log("Great this is ennding soon "+vdate.toDateString());
  }else {
      console.log(date+"Great this is not ennding soon "+vdate.toDateString());
  }//


  });

};
