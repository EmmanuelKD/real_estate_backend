import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import * as serviceAccounnt from "../../real-estate-and-flight-firebase-adminsdk-rdgit-a1b8b62f0a.json";
// sa = service accounnt


/**  @return {admin.app.App} */
function initializeFireaseAPP() {
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccounnt as ServiceAccount),
        databaseURL: "https://mosabi-app.firebaseio.com",
    });
}
/**
 * This is the  local initialization  of the firebase app
 */
export var FirebaseApp = initializeFireaseAPP();
export const fb_store = FirebaseApp.firestore();
export const fb_storage = FirebaseApp.storage();
