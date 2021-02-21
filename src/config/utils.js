const serviceAccount = require('../config/donation-847ad-firebase-adminsdk-i11ss-2ffc06c32c.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://donation-847ad.firebaseio.com`
});
module.exports = {
    addRegistration: async function(paymentId, data){
        console.log("test | ", data);
                admin
                    .firestore()
                    .collection('registration').doc(`${paymentId}`).set({ 
                        ...data,
                        createdAt: Date.now(),
                    })
                    // .add({ 
                    //     ...data,
                    //     createdAt: Date.now(),
                    // })
                    .then(() => {
                        console.log("Successfully added new user");
                    })
                    .catch(error => {
                        console.log("Error creating user:", error);
                        process.exit(1);
                    });
            }

}