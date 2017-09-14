  'use strict';

  module.exports = function(Member) {
    var app =  require('../../server/server');
    var schedule = require('node-schedule');

    Member.validatesPresenceOf('package');
    Member.validatesInclusionOf('gender', {in: ['Male', 'Female']});
    // Member.validatesExclusionOf('domain', {in: ['www', 'billing', 'admin']});
    Member.validatesNumericalityOf('accountnumber', {int: true});

    Member.validatesUniquenessOf( 'accountnumber',{message: 'accountnumber is not unique'});
    Member.validatesLengthOf('contribution', {min:3, message: {min: 'contribution is too short'}});


    Member.observe('after save', function addToSub(ctx, next) {

      if(ctx.instance.substop_stop){
      ctx.instance.account_active = false;
      }else {
        console.log("nothing");
      }

      next();
    }); /// end


  Member.remoteMethod(
      'acttivate',
      {
        http: {path: '/:id/acttivate', verb: 'put'},
        accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
        returns: {root: true, type: 'object'},
        description: 'Marks a member as activated.'
      }
    );

    // the actual function called by the route to do the work
    Member.acttivate = function(id, cb) {
      Member.findById(id, function(err, record){
        record.updateAttributes({account_active: true,substop_start:null,substop_stop:null}, function(err, instance) {
          if (err) cb(err);
          if (!err) cb(null, instance);
        })
      })
    };

      Member.remoteMethod(
          'dacttivate',
          {
            http: {path: '/:id/dacttivate', verb: 'put'},
            accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
            returns: {root: true, type: 'object'},
            description: 'Marks a member as dactivated.'
          }
        );

        // the actual function called by the route to do the work
        Member.dacttivate = function(id, cb) {
          Member.findById(id, function(err, record){
            record.updateAttributes({account_active: false}, function(err, instance) {
              if (err) cb(err);
              if (!err) cb(null, instance);
            })
          })
        };



  };
