import {
  UserMetadataType,
  PriceType,
  ListingDTOType,
  ListingImagesType,
  ListingListingType,
  ListingType,
  RentalForm,
} from "../types/index.type";

/**
 * This is a abstract product class ,
 *  A Listing can be anything users can and and sell on the platform
 */
export abstract class Listing {
  protected id: string;
  protected type: ListingType;
  protected productListingType: ListingListingType = "FOR_LEASE";
  protected rentalForm?: RentalForm;
  protected createdAt: Date;
  protected updatedAt: Date;
  protected deletedAt: Date;
  protected dateOfListing?: string;
  protected soldAt?: Date;
  protected productImages?: ListingImagesType;
  protected listedByUser?: UserMetadataType;
  protected price?: PriceType;
  protected likesCount = 0;
  protected commentCount = 0;
  protected viewsCount = 0;
  protected saleOff?: string;
  protected reviewCount = 0;
  protected description = "";
  protected isAds = false;

  constructor({
    id,
    type,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    type: ListingType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    id: string;
  }) {
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.id = id;
  }

  /**
   * This function return a data transfer object for the this Listing
   * @return ListingDTOType
   */
  toDTO(): ListingDTOType {
    return {
      // createdAt: createdAt,
      // updatedAt: this.updatedAt.toString(),
      // deletedAt: this.deletedAt.toString(),
      soldAt: this.soldAt?.toString(),
      productImages: this.productImages as ListingImagesType,
      listedByUser: this.listedByUser as UserMetadataType,
      id: this.id,
      price: this.price,
      likesCount: this.likesCount,
      description: this.description,
      saleOff: this.saleOff,
      dateOfListing: this.dateOfListing,
      isAds: this.isAds,
    };
  }

  /**
   * @param createdAt this is a date string format eg Thu Aug 11 2022 12:07:45
   */
  setCreatedAt(createdAt: string) {
    this.createdAt = new Date(createdAt);
  }
  /**
   * @param updatedAt takes this is a date string format eg "Thu Aug 11 2022 12:07:45"
   */
  setUpdatedAt(updatedAt: string) {
    this.updatedAt = new Date(updatedAt);
  }

  /**
   * @param deletedAt takes this is a date string format eg "Thu Aug 11 2022 12:07:45"
   */
  setDeletedAt(deletedAt: string) {
    this.updatedAt = new Date(deletedAt);
  }

  /**
   * @param soldAt takes this is a date string format eg "Thu Aug 11 2022 12:07:45"
   */
  setSoldAt(soldAt: string) {
    this.soldAt = new Date(soldAt);
  }
}
