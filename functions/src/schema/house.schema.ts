import { AddressType, HouseAmenitiesType, HouseDTOType, HouseFacilitiesType, HouseRentalPropertyType, HouseSalesPropertyType } from "../types/index.type";
import { Product } from "./product.schema";

/**
* This is the class for Houses 
*/
export class House extends Product {
    protected numberOfRooms: number = 0;
    protected address: AddressType;
    protected amenities: Array<HouseAmenitiesType> = []
    protected facilities: Array<HouseFacilitiesType> = []
    protected guests: number = 0;
    protected beds: number = 0;
    protected baths: number = 0;
    protected bedrooms: number = 0;
    protected propertyType: Array<HouseRentalPropertyType | HouseSalesPropertyType> = []

    constructor({ id, createdAt, updatedAt, deletedAt, address }: {
        createdAt: Date,
        updatedAt: Date, deletedAt: Date,
        id: string,
        address: AddressType
    }) {
        super({ type: "House", id, createdAt, updatedAt, deletedAt });
        this.address = address;
    }

    /**
      * This function return a data transfer object for the this Product
      * @returns HouseDTOType
      */
    toDTO(): HouseDTOType {
        let dto = super.toDTO();
        return {
            ...dto,
            address: this.address,
            numberOfRooms: this.numberOfRooms,
            guests: this.guests,
            beds: this.beds,
            baths: this.baths,
            bedrooms: this.bedrooms,
            amenities: this.amenities,
            numberOfAmenities: this.amenities.length,
            numberOfFacilities: this.facilities.length,
            facilities: this.facilities,
            propertyType: this.propertyType,
        };
    }

}