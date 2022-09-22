import {
  AddressType,
  HouseAmenitiesType,
  HouseDTOType,
  HouseFacilitiesType,
  HouseRentalPropertyType,
  HouseSalesPropertyType,
} from "../types/index.type";
import { Listing } from "./product.schema";

/**
 * This is the class for Houses
 */
export class House extends Listing {
  protected numberOfRooms = 0;
  protected address: AddressType;
  protected amenities: Array<HouseAmenitiesType> = [];
  protected facilities: Array<HouseFacilitiesType> = [];
  protected guests = 0;
  protected beds = 0;
  protected baths = 0;
  protected bedrooms = 0;
  protected propertyType: Array<
    HouseRentalPropertyType | HouseSalesPropertyType
  > = [];

  constructor({
    id,
    createdAt,
    updatedAt,
    deletedAt,
    address,
  }: {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    id: string;
    address: AddressType;
  }) {
    super({ type: "House", id, createdAt, updatedAt, deletedAt });
    this.address = address;
  }

  /**
   * This function return a data transfer object for the this Product
   * @return HouseDTOType
   */
  toDTO(): HouseDTOType {
    const dto = super.toDTO();
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
