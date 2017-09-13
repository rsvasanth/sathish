'use strict';

module.exports = function(Autoemail) {
  var app =  require('../../server/server');
// var list = {};
// var http = require('http');
//
// function getCurrentMembers() {
// // this part has to be node schedule ingration!
//   return http.get({
//     port:3000,
//       host: '',
//       path: '/api/currentSubscriptions'
//   }, function(response) {
//       // Continuously update stream with data
//       var body = '';
//             response.on('data', function(d) {
//                 body += d;
//             });
//             response.on('end', function() {
//
//        // Data reception is done, do whatever with it!
//        var parsed = JSON.parse(body);
//        list = parsed;
//
//     var html ='<h3>The Fallowing Member has been addedd the Nandini Subscription List !</h3>'+JSON.stringify(list,['email','account','amount'])
//     ;
//    Autoemail.sendEmail = function() {
//          Autoemail.app.models.Email.send({
//             to: 'rsvasanth@gmail.com',
//             from: 'avnandinistore@gmail.com',
//             subject: 'Nandini Member Monthly  Subscription List for FS',
//             text: 'Nandini Member Subscription Info',
//             html: html
//           }, function(err, mail) {
//             console.log('email sent!');
//                  console.log(err);
//           });
//         };
//  Autoemail.sendEmail();
//
//    });
//
//
//   });
//
// };
// getCurrentMembers();

};
