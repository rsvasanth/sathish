var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.db;
var schema_v2 = {
  "name": "Member",
  "base": "PersistedModel",
  "strict": false,
  "idInjection": false,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "fullname": {
      "type": "string"
    },
    "partner": {
      "type": "string"
    },
    "child1": {
      "type": "string"
    },
    "child2": {
      "type": "string"
    },
    "community": {
      "type": "string"
    },
    "package": {
      "type": "string"
    },
    "phone": {
      "type": "number"
    },
    "gender": {
      "type": "string"
    },
    "nationality": {
      "type": "string"
    },
    "contribution": {
      "type": "number"
    },
    "birthday": {
      "type": "date"
    },
    "status": {
      "type": "string"
    },
    "accountnumber": {
      "type": "number",
      "min":5,
      "max":7,
      "required": true
    },
    "account_active": {
      "type": "boolean"
    },
    "photo_url": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
};//end of schema_v1




ds.createModel(schema_v2.name, schema_v2.properties, schema_v2.options);
ds.autoupdate(schema_v2.name, function (err, result) {
  ds.discoverModelProperties('Member', function (err, props) {
    console.log(props);
  });
});
