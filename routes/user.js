//user database of realm
var Realm = require('realm');
var Ukey = new Int8Array(64);
let UserSchema = {
  name: 'User',
  primaryKey:'Id',
  properties: {
    Id: 'string',
    name:'string',
    password: 'string',
  }
};
var UserRealm = new Realm({
  path: 'User.realm',
  schema: [UserSchema],
  encryptionKey:Ukey,
  schemaVersion: 1,
  migration: function(oldRealm, newRealm) {
    if (oldRealm.schemaVersion < 1) {
      var oldObjects = oldRealm.objects('User');
      var newObjects = newRealm.objects('User');
      for (var i = 0; i < oldObjects.length; i++) {
        newObjects[i].name = oldObjects[i].firstName + ' ' + oldObjects[i].lastName;
      }
    }
  }
});
module.exports = UserRealm;
