import { BUCKET_NAME } from "../config/constant";
import { logger } from "../utils";
import { imageSizes, imagesPathBase, SavedImagesTypes, usersImagePath, ImageSizeObject } from "../utils/constants";
import { fb_storage, fb_store, } from "../utils/firebase";
// import * as storage from "@google-cloud/storage"
import { tmpdir } from "os"
import { join, dirname } from "path"
import * as sharp from "sharp"
import * as functions from "firebase-functions";
import * as fs from "fs-extra";
import { AssetOwnerType, ImageUrlsType } from "../types/index.type";
import { updateDocument } from "./firebaseFirestoreAccess";
import { FieldValue } from "firebase-admin/firestore"

var storage = fb_storage.bucket(BUCKET_NAME);

/**
 * 
 * @param param0 
 * @returns Promise<boolean> if the delete was successful or not
 */
async function addImageToStore({ file, image, description }: { file: string, image: Blob, description?: string }): Promise<boolean> {

    const buffer = await image.arrayBuffer()
    return await storage.file(file).save(Buffer.from(buffer), {
        public:true,
        metadata: {
            description
        }
    }).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}

const dateString = (date: Date) => date.toJSON().replace('T', '_').replace(':', '-').slice(0, 23);

export async function uploadUsersProfile({ image, usersId, ismain = false }: { file: string, image: Blob, usersId: string, ismain: boolean }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, SavedImagesTypes.users, usersId, `${ismain && "main_"}profile.png`), image });
}

export async function uploadBlogImages({ image, blogId, ismain = false }: { file: string, image: Blob, blogId: string, ismain: boolean }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, SavedImagesTypes.blogPost, blogId, `${ismain && "main_"}blog_${dateString(new Date())}.png`), image });
}

export async function uploadListingImages({ image, listingId, ismain = false }: { file: string, image: Blob, listingId: string, ismain: boolean }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, SavedImagesTypes.listings, listingId, `${ismain && "main_"}listing_${dateString(new Date())}.png`), image });
}


export async function uploadTravelsImages({ image, travelslId, ismain = false }: { file: string, image: Blob, travelslId: string, ismain: boolean }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, SavedImagesTypes.travels, travelslId, `${ismain && "main_"}travel_${dateString(new Date())}.png`), image });
}


export async function uploadAppConfigImages({ image, travelslId, ismain = false }: { file: string, image: Blob, travelslId: string, ismain: boolean }): Promise<boolean> {
    return await addImageToStore({ file: usersImagePath(imagesPathBase, SavedImagesTypes.appConfig, travelslId, `${ismain && "main_"}appConf_${dateString(new Date())}.png`), image });
}

export async function deleteImage({ path }: { path: string }): Promise<boolean> {
    return await storage.file(path).delete().then((res) => {
        return true;
    }).catch((e) => {
        console.error(`${e}`);
        return false;
    });
}

export async function imagesfileArranges(object: functions.storage.ObjectMetadata, context: functions.EventContext) {
    const bucket = fb_storage.bucket(object.bucket);
    const savedFilePath = object.name;
    const paths = savedFilePath?.split("/");
    const fileName = paths?.pop();
    let owner: AssetOwnerType = {};

    if ((paths?.length ?? 0) > 0) {
        const isMainDetiminer = fileName?.split("_");
        if (isMainDetiminer?.[0] === "main") {
            owner.ismainAsset = true;
        } else {
            owner.ismainAsset = false;
        }

        owner.collectonName = paths?.[1];
        owner.documentId = paths?.[2];

    } else {
        return;
    }


    const bucketDir = dirname(savedFilePath as string);

    const workingDir = join(tmpdir(), "thumbs");
    const tempFilePath = join(workingDir, "image.png");

    if (!object.contentType?.includes("image") || fileName?.includes("@thumb")) {

        await fs.ensureDir(workingDir);

        let file = bucket.file(savedFilePath as string);
        const imageDescription = file.getMetadata();

        await file.download({
            destination: tempFilePath
        })

        object.mediaLink
        let previousRef: ImageUrlsType={main:createPersistentDownloadUrl(BUCKET_NAME,savedFilePath,)}

        const uploadedPromises = imageSizes.map((size) => {
            const thumbName = `@thumb${size}_${fileName}`;
            const tempthumbName = join(workingDir, thumbName);
            sharp(tempFilePath).resize(size, size).toFile(tempthumbName);


            const storagePath = join(bucketDir, thumbName);

            // const sizeFile = dataGetter(size, storagePath);

            bucket.upload(tempthumbName, {
                destination: storagePath
            }).then((re) => {
                re[0].get
            })
        })

        await Promise.all(uploadedPromises);;
        fs.remove(workingDir);

    }

}

function dataGetter(size: number, url: string, previousRef: ImageUrlsType) {
    var newRef = {}
    switch (size) {
        case ImageSizeObject.main:
            newRef = { main: url }
        case ImageSizeObject.medium:
            newRef = { medium: url }
        case ImageSizeObject.small:
            newRef = { small: url }
        case ImageSizeObject.thumbnail:
            newRef = { thumbnail: url }
    }
    return { ...previousRef, ...newRef };
}
function updateImageCollection(imageType: string, documentId: string, ismainImage: boolean, imageDescription: string, pathData: Object) {
    // if(imageType!==null && )

    switch (imageType) {
        case SavedImagesTypes.appConfig: {
            updateDocument({
                collectionId: SavedImagesTypes.appConfig, documentId, data: {

                }
            })
        }
        case SavedImagesTypes.blogPost: {
            updateDocument({
                collectionId: SavedImagesTypes.appConfig, documentId, data: {

                }
            })
        }
        case SavedImagesTypes.listings: {
            updateDocument({
                collectionId: SavedImagesTypes.listings, documentId, data: {
                    ...(ismainImage ? {
                        productImages: {
                            mainFile: {
                                imageUrls: pathData
                            }
                        }
                    } : {
                        productImages: {
                            imageFiles: FieldValue.arrayUnion({ imageUrls: pathData })
                        }
                    })
                }
            })
        }
        case SavedImagesTypes.travels: {
            updateDocument({
                collectionId: SavedImagesTypes.travels, documentId, data: {

                }
            })
        }
        case SavedImagesTypes.users: {
            updateDocument({
                collectionId: SavedImagesTypes.users, documentId, data: {

                }
            })
        }

    }
}

const createPersistentDownloadUrl = (bucket:string, pathToFile:string, downloadToken:string) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(pathToFile)}?alt=media&token=${downloadToken}`;
  };
