import { logger } from "../utils";
import { fb_store } from "../utils/firebase";

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the delete was successful or not
 */
export function getCollectionRef({ collectionId }: { collectionId: string }): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> | null {
    try {
        return fb_store.collection(collectionId)
    } catch (e) {
        logger("unknown error = " + JSON.stringify(e));
        return null;
    }
}

/**
 * 
 * @param param0 
 * @returns Promise<string> id or null of the document added
 */
export async function addToDocumentCollection({ collectionId, data }: { collectionId: string, data: object }): Promise<string | null> {
    try {
        return (await fb_store.collection(collectionId).add(data)).id
    } catch (e) {
        logger("unknown error = " + JSON.stringify(e));
        return null;
    }
}

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the update was successful or not
 */
export async function updateDocument({ collectionId, documentId, data }: { documentId: string, collectionId: string, data: object }): Promise<boolean> {
    try {
        return await fb_store.collection(collectionId).doc(documentId).update(data).then((res) => {
            return true;
        }).catch(() => {
            return false;
        })
    } catch (e) {
        logger("unknown error = " + JSON.stringify(e));
        return false;
    }
}

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the delete was successful or not
 */
export async function deleteDocument({ collectionId, documentId }: { documentId: string, collectionId: string }): Promise<boolean> {
    try {
        return await fb_store.collection(collectionId).doc(documentId).delete().then((res) => {
            return true;
        }).catch(() => {
            return false;
        })
    } catch (e) {
        logger("unknown error = " + JSON.stringify(e));
        return false;
    }
}

