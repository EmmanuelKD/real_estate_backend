import {
  CarBodyType,
  CarDTOType,
  CarFuelType,
  SizeType,
  SteeringPositionValue,
} from "../types/index.type";
import { Listing } from "./product.schema";

export class Car extends Listing {
  protected name?: string;
  protected countryOfAssembly?: string;
  protected bodyType: CarBodyType = "Other";
  protected size?: SizeType;
  /**
   * A slogan or motto associated with the item.
   */
  protected slogan?: string;
  /**
   * The ACRISS Car Classification Code is a code used by many car rental companies, for classifying vehicles.
   *  ACRISS stands for Association of Car Rental Industry Systems and Standards
   */
  // protected acrissCode?: string;
  /**
   * A textual description of known damages, both repaired and unrepaired.
   */
  protected knownVehicleDamages?: string;
  /**
   * The total distance travelled by the particular vehicle
   *  since its initial production, as read from its odometer.
   */
  protected mileageFromOdometer?: string;

  /**
   * The release date of a vehicle model (often used to differentiate
   *  versions of the same make and model).
   */
  protected modelDate?: string;
  /**
   * The date of production of the item, e.g. vehicle.
   */
  protected productionDate?: string;
  protected numberOfDoors?: string;
  /**
   * The total number of forward gears available for the transmission system of the vehicle.
   */
  protected numberOfForwardGears?: string;
  protected numberOfAxles?: string;
  protected numberOfAirbags?: string;
  protected numberOfPreviousOwners?: string;
  protected speed?: string;
  /**
   * The position of the steering wheel or similar device (mostly for cars).
   */
  protected steeringPosition?: SteeringPositionValue;
  protected color?: Array<string>;
  protected seatingCapacity?: number;
  /**
   * The type of fuel suitable for the engine or engines of the vehicle.
   *  If the vehicle has only one engine, this property can be attached directly to the vehicle.
   */
  protected fuelType?: CarFuelType;
  protected brand?: string;
  /**
   * This function return a data transfer object for the this Product
   * @return HomeDTOType
   */
  toDTO(): CarDTOType {
    const dto = super.toDTO();
    return {
      ...dto,
      name: this.name,
      countryOfAssembly: this.countryOfAssembly,
      size: this.size,
      slogan: this.slogan,
      // acrissCode: this.acrissCode,
      bodyType: this.bodyType,
      modelDate: this.modelDate,
      productionDate: this.productionDate,
      knownVehicleDamages: this.knownVehicleDamages,
      mileageFromOdometer: this.mileageFromOdometer,
      numberOfDoors: this.numberOfDoors,
      numberOfForwardGears: this.numberOfForwardGears,
      numberOfAxles: this.numberOfAxles,
      numberOfAirbags: this.numberOfAirbags,
      numberOfPreviousOwners: this.numberOfPreviousOwners,
      speed: this.speed,
      steeringPosition: this.steeringPosition,
      brand: this.brand,
      color: this.color,
      seatingCapacity: this.seatingCapacity,
      fuelType: this.fuelType,
    };
  }
}
