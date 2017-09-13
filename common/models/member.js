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
      if (ctx.instance.substop_start && ctx.instance.substop_stop && ctx.instance.account_active == false ){
        console.log("Got the stop request dates start "+ +"Got the stop request dates start "+ctx.instance.substop_stop);
        ctx.instance.account_active = false;
        var date = ctx.instance.substop_stop.toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')  ;
        console.log(date);
        let startTime =new Date(Date.now(date)+8000);
        let endTime = new Date(Date.now()+ 10000);

        var data = {
          memberId:ctx.instance.id,
          start:ctx.instance.substop_start,
          end:ctx.instance.substop_stop,
          member:ctx.instance.fullname
        };
          app.models.Autotrig.create(data).then(function (res) {
          console.log('subc: %s', res.id);
        }).catch(function (err) {
          console.log(err);
        });

      }
      if (ctx.instance.account_active === true ) {

        
        console.log("account_active true");
        var defaultToken = {
          email:ctx.instance.email,
          account:ctx.instance.accountnumber,
          amount:ctx.instance.contribution
        };
        var html ='<h3>The Fallowing Member has been addedd the Nandini Subscription List !</h3>'+JSON.stringify(defaultToken);
        Member.sendEmail = function() {
          Member.app.models.Email.send({
            to: 'rsvasanth@gmail.com',
            from: 'avnandinistore@gmail.com',
            subject: 'Nandini Member Subscription Info',
            text: 'Nandini Member Subscription Info',
            html: html
          }, function(err, mail) {
            console.log('email sent!');
            console.log(err);
          });
        };
        Member.sendEmail();

        app.models.currentSubscription.create(defaultToken).then(function (res) {
          console.log('subc: %s', res.id);
        }).catch(function (err) {
          console.log(err);
        });

      }else {

        app.models.currentSubscription.destroyAll({account:ctx.instance.accountnumber }, function(err, obj) {

          console.log(err);
        });
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






  };
