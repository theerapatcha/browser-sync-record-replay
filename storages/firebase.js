
var admin = require("firebase-admin");
var serviceAccount = require("../firebase-config.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://team-project-e0fc1.firebaseio.com"//  "https://browser-sync-record.firebaseio.com"
});

module.exports.get = function(id){
    var ref = admin.database().ref("record/"+id);
    return ref.once('value');
}
module.exports.store = function(id, value) {
    console.log("do store");
    console.log(id, value);
     return admin.database().ref("record/"+id).set(value).catch(console.log);
}