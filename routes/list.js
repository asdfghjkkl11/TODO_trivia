var Realm = require('realm');
var Lkey = new Int8Array(64);
let ListSchema = {
  name: 'List',
  primaryKey:'id',
  properties: {
    user: 'string',
    id:{type: 'int', indexed: true},
    timestamp: 'string',
    todo: {type: 'string', optional: true},
    title: 'string',
    content: 'string',
    success: 'bool'
  }
};
var ListRealm = new Realm({
  path: 'List.realm',
  schema: [ListSchema],
  encryptionKey:Lkey,
  schemaVersion: 1,
  migration: function(oldRealm, newRealm) {
    if (oldRealm.schemaVersion < 1) {
      var oldObjects = oldRealm.objects('List');
      var newObjects = newRealm.objects('List');
      for (var i = 0; i < oldObjects.length; i++) {
        newObjects[i].name = oldObjects[i].firstName + ' ' + oldObjects[i].lastName;
      }
    }
  }
});
module.exports = ListRealm;
