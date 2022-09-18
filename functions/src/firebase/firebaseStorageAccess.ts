import { BUCKET_NAME } from "../config/constant";
import { logger } from "../utils";
import { fb_storage } from "../utils/firebase";

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the delete was successful or not
 */
export function addImageToStore({ file }: { file: string }): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> | null {
    try {
        var storage = fb_storage.bucket(BUCKET_NAME);
        // for(let file in files){
        // }


        return null;
    } catch (e) {
        logger("unknown error = " + JSON.stringify(e));
        return null;
    }
}
