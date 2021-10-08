import functions from 'firebase-functions';
import admin from 'firebase-admin';
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
	const original = req.query.text;
	const writeResult = await admin.firestore().collection('message').add({ original });
	res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
