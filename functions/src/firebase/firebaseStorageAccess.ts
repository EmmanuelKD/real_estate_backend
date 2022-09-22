import { BUCKET_NAME } from "../config/constant";
// import { logger } from "../utils";
import {
    ImageSizeObject,
    imageSizes,
    imagesPathBase,
    SavedImagesTypes,
    TokenPlaceHolder,
    usersImagePath
} from "../utils/constants";
import { fb_storage } from "../utils/firebase";
// import * as storage from "@google-cloud/storage"
import { FieldValue } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import * as fs from "fs-extra";
import { tmpdir } from "os";
import { dirname, join } from "path";
import * as sharp from "sharp";
import { AssetOwnerType, ImageUrlsType } from "../types/index.type";
import { updateDocument } from "./firebaseFirestoreAccess";

const storage = fb_storage.bucket(BUCKET_NAME);

/**
 *
 * @param param0
 * @return Promise<boolean> if the delete was successful or not
 */
async function addImageToStore({
    file,
    image,
    description,
}: {
    file: string;
    image: Blob;
    description?: string;
}): Promise<boolean> {
    const buffer = await image.arrayBuffer();
    return await storage
        .file(file)
        .save(Buffer.from(buffer), {
            public: true,
            metadata: {
                description,
            },
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
            return false;
        });
}

const dateString = (date: Date) =>
    date.toJSON().replace("T", "_").replace(":", "-").slice(0, 23);

export async function uploadUsersProfile({
    image,
    usersId,
    ismain = false,
}: {
    file: string;
    image: Blob;
    usersId: string;
    ismain: boolean;
}): Promise<boolean> {
    return await addImageToStore({
        file: usersImagePath(
            imagesPathBase,
            SavedImagesTypes.users,
            usersId,
            `${ismain && "main_"}profile.png`
        ),
        image,
    });
}

export async function uploadBlogImages({
    image,
    blogId,
    ismain = false,
}: {
    file: string;
    image: Blob;
    blogId: string;
    ismain: boolean;
}): Promise<boolean> {
    return await addImageToStore({
        file: usersImagePath(
            imagesPathBase,
            SavedImagesTypes.blogPost,
            blogId,
            `${ismain && "main_"}blog_${dateString(new Date())}.png`
        ),
        image,
    });
}

export async function uploadListingImages({
    image,
    listingId,
    ismain = false,
}: {
    file: string;
    image: Blob;
    listingId: string;
    ismain: boolean;
}): Promise<boolean> {
    return await addImageToStore({
        file: usersImagePath(
            imagesPathBase,
            SavedImagesTypes.listings,
            listingId,
            `${ismain && "main_"}listing_${dateString(new Date())}.png`
        ),
        image,
    });
}

export async function uploadTravelsImages({
    image,
    travelslId,
    ismain = false,
}: {
    file: string;
    image: Blob;
    travelslId: string;
    ismain: boolean;
}): Promise<boolean> {
    return await addImageToStore({
        file: usersImagePath(
            imagesPathBase,
            SavedImagesTypes.travels,
            travelslId,
            `${ismain && "main_"}travel_${dateString(new Date())}.png`
        ),
        image,
    });
}

export async function uploadAppConfigImages({
    image,
    travelslId,
    ismain = false,
}: {
    file: string;
    image: Blob;
    travelslId: string;
    ismain: boolean;
}): Promise<boolean> {
    return await addImageToStore({
        file: usersImagePath(
            imagesPathBase,
            SavedImagesTypes.appConfig,
            travelslId,
            `${ismain && "main_"}appConf_${dateString(new Date())}.png`
        ),
        image,
    });
}

export async function deleteImage({
    path,
}: {
    path: string;
}): Promise<boolean> {
    return await storage
        .file(path)
        .delete()
        .then((res) => {
            return true;
        })
        .catch((e) => {
            console.error(`${e}`);
            return false;
        });
}

export async function imagesFileArranges(
    object: functions.storage.ObjectMetadata,
    context: functions.EventContext
) {

    const savedFilePath = object.name;
    const paths = savedFilePath?.split("/");
    const fileName = paths?.pop();

    if (!object.contentType?.includes("image") || fileName?.includes("@thumb")) return false;

    const bucket = fb_storage.bucket(object.bucket);
    const owner: AssetOwnerType = {};


    if ((paths?.length ?? 0) > 1) {
        const isMainDetiminer = fileName?.split("_");
        if (isMainDetiminer?.[0] === "main") {
            owner.ismainAsset = true;
        } else {
            owner.ismainAsset = false;
        }

        owner.collectonName = paths?.[1];
        owner.documentId = paths?.[2];
    } else {

        return false;
    }

    const bucketDir = dirname(savedFilePath as string);

    const workingDir = join(tmpdir(), "thumbs");
    const tempFilePath = join(workingDir, "image.png");


    await fs.ensureDir(workingDir);

    await bucket.file(savedFilePath as string).download({
        destination: tempFilePath,
    });

    // @ts-ignore
    const { description } = object.metadata;

    let previousRef: ImageUrlsType = {
        main: createPersistentDownloadUrl(BUCKET_NAME, savedFilePath as string),
    };

    const uploadedPromises = imageSizes.map(async (size) => {
        let thumbName = `@thumb_x${size}_${fileName}`;
        let tempThumbPath = join(workingDir, thumbName);

        await sharp(tempFilePath).resize(size, size).toFile(tempThumbPath);

        const storagePath = join(bucketDir, thumbName);

        const url = createPersistentDownloadUrl(
            BUCKET_NAME,
            storagePath as string
        );

        pathsGetter(size, url, previousRef);

        return bucket.upload(tempThumbPath, {
            destination: storagePath,
        });
    });

    await Promise.all(uploadedPromises).then(async () => {
        await updateImageCollection(
            owner.collectonName as string,
            owner.documentId as string,
            owner.ismainAsset as boolean,
            description ?? "no description",
            previousRef
        ).then(() => {
            console.log("All images added");
        });
    });
    fs.remove(workingDir);

    return true;
}

function pathsGetter(size: number, url: string, previousRef: ImageUrlsType) {

    switch (size) {
        case ImageSizeObject.medium:
            previousRef.medium = url;

        case ImageSizeObject.small:
            previousRef.small = url

        case ImageSizeObject.thumbnail:
            previousRef.thumbnail = url;
    }

}
async function updateImageCollection(
    imageType: string,
    documentId: string,
    ismainImage: boolean,
    imageDescription: string,
    pathData: ImageUrlsType
) {
    // if(imageType!==null && )

    switch (imageType) {
        case SavedImagesTypes.appConfig: {
            await updateDocument({
                collectionId: SavedImagesTypes.appConfig,
                documentId,
                data: {},
            });
        }
        case SavedImagesTypes.blogPost: {
            await updateDocument({
                collectionId: SavedImagesTypes.appConfig,
                documentId,
                data: {},
            });
        }
        case SavedImagesTypes.listings: {
            await updateDocument({
                collectionId: SavedImagesTypes.listings,
                documentId,
                data: {
                    ...(ismainImage
                        ? {
                            productImages: {
                                mainFile: {
                                    imageUrls: pathData,
                                    description: imageDescription,
                                },
                            },
                        }
                        : {
                            productImages: {
                                imageFiles: FieldValue.arrayUnion({
                                    imageUrls: pathData,
                                    description: imageDescription,
                                }),
                            },
                        }),
                },
            });
        }

        case SavedImagesTypes.travels: {
            await updateDocument({
                collectionId: SavedImagesTypes.travels,
                documentId,
                data: {},
            });
        }

        case SavedImagesTypes.users: {
            await updateDocument({
                collectionId: SavedImagesTypes.users,
                documentId,
                data: {},
            });
        }
    }
}

const createPersistentDownloadUrl = (bucket: string, pathToFile: string) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        pathToFile
    )}?alt=media&token=${TokenPlaceHolder}`;
};
