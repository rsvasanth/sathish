// module.exports = function(app) {
// console.log("Running bootscript");
// var schedule = require('node-schedule');
// var prettyjson = require('prettyjson');
// var options = {
// color:'red'
// };
//
//
// var Autotrig = app.models.Autotrig;
//
// function functionName() {
//
// };
//
// function mainFunction(callback) {
// var result =[];
//   app.models.Autotrig.find({}).then(function(res){
//     res.forEach(function(data) {
//       result.push({id:data.memberId ,end:data.end})
//
//
//     });
//       callback(result);
//   });
//
// };
//
// mainFunction(function(a){
//
//   a.forEach(function(d){
//     console.log("ID Number: "+ d.id+" End Date :"+ d.end.toDateString());
//     app.models.Member.find({id:d.id}).then(function (res,ctx) {
//     console.log(res[0].account_active);
//
//     var http = require('http');
//
//     var options = {
//     host: 'localhost',
//     path: '/api/Members/'+d.id+'/acttivate',
//     port: 3000,
//     method: 'PUT'
//     };
//
//     var callback = function(response) {
//     var str = '';
//
//     //another chunk of data has been recieved, so append it to `str`
//     response.on('data', function(chunk) {
//     str += chunk;
//     });
//
//     //the whole response has been recieved, so we just print it out here
//     response.on('end', function() {
//
//     });
//     };
//
//     http.request(options, callback).end();
//
//     });
//   });
// });
//
// // setInterval(function(){
// //     //code goes here that will be run every 5 seconds.
// // }, 5000);
// // //
//
// };
// //
