//todo database of realm
var Realm = require('realm');
var Lkey = new Int8Array(64);
let ListSchema = {
  name: 'List',
  properties: {
    user: 'string',
    timestamp: 'string',
    title: 'string',
    content: 'string',
    success: 'string',
    check: 'string',
    todo: {type: 'string', optional: true}
  }
};
var ListRealm = new Realm({
  path: 'List.realm',
  schema: [ListSchema],
  encryptionKey:Lkey,
  schemaVersion: 3,
  migration: function(oldRealm, newRealm) {
    if (oldRealm.schemaVersion < 3) {
      var oldObjects = oldRealm.objects('List');
      var newObjects = newRealm.objects('List');
      for (var i = 0; i < oldObjects.length; i++) {
        newObjects[i].name = oldObjects[i].firstName + ' ' + oldObjects[i].lastName;
      }
    }
  }
});
module.exports = ListRealm;
