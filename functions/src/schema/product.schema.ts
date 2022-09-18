import { ListedByUserMetadataType, PriceType, ProductDTOType, ProductImagesType, ProductListingType, ProductType, RentalForm } from "../types/index.type";

/**
 * This is a abstract product class ,
 *  A Product can be anything users can and and sell on the platform
 */
export abstract class Product {
    protected id: string;
    protected type: ProductType;
    protected productListingType: ProductListingType = 'FOR_LEASE';
    protected rentalForm?: RentalForm;
    protected createdAt: Date;
    protected updatedAt: Date;
    protected deletedAt: Date;
    protected soldAt?: Date;
    protected productImages?: ProductImagesType
    protected listedByUserId?: ListedByUserMetadataType;
    protected price?: PriceType;
    protected likesCount: number = 0;
    protected commentCount: number = 0;
    protected viewsCount: number = 0;
    protected saleOff?: string;
    protected reviewCount: number = 0;
    protected description: string = "";

    constructor({ id, type, createdAt, updatedAt, deletedAt }: {
        type: ProductType, createdAt: Date,
        updatedAt: Date, deletedAt: Date,
        id: string
    }) {
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.id = id;
    }

    /**
     * This function return a data transfer object for the this Product 
     * @returns ProductDTOType
     */
    toDTO(): ProductDTOType {
        return {
            createdAt: this.createdAt.toString(),
            // updatedAt: this.updatedAt.toString(),
            // deletedAt: this.deletedAt.toString(),
            soldAt: this.soldAt?.toString(),
            productImages: this.productImages as ProductImagesType,
            listedByUserId: this.listedByUserId as ListedByUserMetadataType,
            id: this.id,
            price: this.price,
            likesCount: this.likesCount,
            description: this.description,
            saleOff: this.saleOff,
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