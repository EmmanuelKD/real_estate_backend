import { BUCKET_NAME } from "../config/constant";
import { logger } from "../utils";
import { imageSizes, imagesPathBase, savedImagesTypes, usersImagePath } from "../utils/constants";
import { fb_storage } from "../utils/firebase";
// import * as storage from "@google-cloud/storage"
import { tmpdir } from "os"
import { join, dirname } from "path"
import * as sharp from "sharp"
import * as functions from "firebase-functions";
import * as fs from "fs-extra";

var storage = fb_storage.bucket(BUCKET_NAME);

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the delete was successful or not
 */
async function addImageToStore({ file, image }: { file: string, image: Blob }): Promise<boolean> {
    const buffer = await image.arrayBuffer()
    return await storage.file(file).save(Buffer.from(buffer)).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}

const dateString = (date: Date) => date.toJSON().replace('T', '_').replace(':', '-').slice(0, 23);

export async function uploadUsersProfile({ image, usersId }: { file: string, image: Blob, usersId: string }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, savedImagesTypes.users, usersId, `profile.png`), image });
}

export async function uploadBlogImages({ image, blogId }: { file: string, image: Blob, blogId: string }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, savedImagesTypes.blogPost, blogId, `blog_${dateString(new Date())}.png`), image });
}

export async function uploadListingImages({ image, listingId }: { file: string, image: Blob, listingId: string }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, savedImagesTypes.listings, listingId, `listing_${dateString(new Date())}.png`), image });
}


export async function uploadTravelsImages({ image, travelslId }: { file: string, image: Blob, travelslId: string }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, savedImagesTypes.travels, travelslId, `travel_${dateString(new Date())}.png`), image });
}


export async function uploadAppConfigImages({ image, travelslId }: { file: string, image: Blob, travelslId: string }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, savedImagesTypes.appConfig, travelslId, `appConf_${dateString(new Date())}.png`), image });
}

export async function deleteImage({ path }: { path: string }): Promise<boolean> {
    return await storage.file(path).delete().then((res) => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}

export async function imagesfileArranges(object: functions.storage.ObjectMetadata, context: functions.EventContext) {
    const bucket = fb_storage.bucket(object.bucket);
    const savedFilePath = object.name;
    const fileName = savedFilePath?.split("/").pop();
    const bucketDir = dirname(savedFilePath as string);

    const workingDir = join(tmpdir(), "thumbs");
    const tempFilePath = join(workingDir, "image.png");

    if (!object.contentType?.includes("image") || fileName?.includes("@thumb")) {

        await fs.ensureDir(workingDir);

        await bucket.file(savedFilePath as string).download({
            destination: tempFilePath
        })

        const uploadedPromises = imageSizes.map((size) => {
            const thumbName = `@thumb${size}_${fileName}`;
            const tempthumbName = join(workingDir, thumbName);
            sharp(tempFilePath).resize(size, size).toFile(tempthumbName);

            return bucket.upload(tempthumbName, {
                destination: join(bucketDir, thumbName)
            })
        })

        Promise.all(uploadedPromises);
        fs.remove(workingDir);

    }

}

