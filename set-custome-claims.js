
var admin = require("firebase-admin");
var uid = process.argv[2];

var serviceAccount = require("./football-4a884-firebase-adminsdk-3m0f2-310239c642.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://football-4a884-default-rtdb.firebaseio.com"
});


admin.auth().setCustomUserClaims(uid, {admin: true})
    .then(() => {
        console.log(`custom claims set for user`, uid);
        process.exit();
    })
    .catch(error => {
        console.log('error',error);
        process.exit();
    });

    // set user as Admin
    // run node set-custome-claims.js [userId]
    