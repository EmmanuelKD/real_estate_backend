import { AddressType, LandDTOType } from "../types/index.type";
import { Product } from "./product.schema";

/**
* This is the class for homes 
*/
export class Land extends Product {
    protected location: AddressType;

    constructor({ id, createdAt, updatedAt, deletedAt, location }: {
        createdAt: Date,
        updatedAt: Date, deletedAt: Date,
        id: string,
        location: AddressType
    }) {
        super({ type: "LAND", id, createdAt, updatedAt, deletedAt });
        this.location = location;
    }

    /**
      * This function return a data transfer object for the this Product
      * @returns LandDTOType
      */
    toDTO(): LandDTOType {
        let dto = super.toDTO();
        return {
            ...dto,
            location: this.location,
        };
    }

}