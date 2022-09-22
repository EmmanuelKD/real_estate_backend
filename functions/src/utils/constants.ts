export const imagesPathBase = "images";
export const usersImagePath = (
  imagesPathBase: string,
  type: string,
  uid: string,
  extraPath?: string
) => `${imagesPathBase}/${type}/${uid}/${extraPath && extraPath}`;

export const SavedImagesTypes = {
  users: "users",
  listings: "listings",
  travels: "travels",
  blogPost: "blogPost",
  appConfig: "AppConfig",
};

export const ImageSizeObject = {
  thumbnail: 50,
  small: 370,
  medium: 512,
  // main: 1024,
};
export const TokenPlaceHolder = "TOKEN_PLACEHOLDER";
export const imageSizes = [
  // ImageSizeObject.main,
  ImageSizeObject.medium,
  ImageSizeObject.small,
  ImageSizeObject.thumbnail,
];
