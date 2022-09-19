
export type ListingType =
    'House' | 'CAR' | 'TICKET' | 'LAND'

export type ListingListingType = 'FOR_SALE' | 'FOR_LEASE' | 'FOR_RENT'

export type RentalForm = 'ENTIRE_PLACE' | 'PRIVATE_ROOM' | 'SHARED_ROOM'

export type ExperienceListingType = 'NATIONAL' | 'INTERNATIONAL'

export type ListingStorStatusType = 'NEWLY_ADDED' | 'SUSPENDED' | 'UNSAVED' | 'SOLD'

export type SizeType = {
    width?: number;
    height?: number;
    length?: number;
}

export type ImageUrlsType = {
    thumbnail: string
    small: string
    medium: string
    large: string
    main: string
}

export type ImageFileType = {
    imageUrls: ImageUrlsType
    description: string
}

/**
 * This is the  entire set of images a product can have
 */
export type ListingImagesType = { 
    imageFiles: Array<ImageFileType>
    mainFile: ImageFileType
}

export type UserMetadataType = {
    id: string
    fullName: string
    thumbnailImageURL: string
    rating: number,
}


export type ListingDTOType = {
    dateOfListing: string,
    name?: string;
    // createdAt: string,
    // updatedAt: string,
    // deletedAt: string,
    soldAt?: string,
    salesOff?: string,
    productImages: ListingImagesType,
    listedByUser: UserMetadataType,
    price?: PriceType,
    likesCount?: number,
    commentCount?: number,
    viewCount?: number,
    reviewCount?: number,
    starRating?: number,
    saleOff?: string,
    id: string,
    description: string,
    isAds: boolean
}

export type HouseDTOType = ListingDTOType & {
    address: AddressType
    numberOfRooms?: number
    guests: number
    beds: number
    baths: number
    bedrooms: number
    amenities: Array<HouseAmenitiesType>
    facilities: Array<HouseFacilitiesType>
    numberOfAmenities: number
    numberOfFacilities: number
    propertyType: Array<HouseRentalPropertyType | HouseSalesPropertyType>

}

export type LandDTOType = ListingDTOType & {
    location: AddressType,
    size: SizeType
}

export type CarDTOType = ListingDTOType & {
    packingAddress?: AddressType
    countryOfAssembly?: string;
    size?: SizeType;
    slogan?: string;
    bodyType: CarBodyType;
    modelDate?: string
    productionDate?: string
    knownVehicleDamages?: string
    mileageFromOdometer?: string,
    numberOfDoors?: string,
    numberOfForwardGears?: string,
    numberOfAxles?: string,
    numberOfAirbags?: string,
    numberOfPreviousOwners?: string,
    speed?: string,
    steeringPosition?: SteeringPositionValue,
    brand?: string,
    color?: Array<string>
    seatingCapacity?: number,
    fuelType?: CarFuelType,
    gearshiftType: GearshiftType,
    carGeneralAmenities?: Array<CarGeneralAmenitiesType>
    carSafetyAmenities?: Array<CarSafetyAmenitiesType>
    carOtherAmenities?: Array<CarOtherAmenitiesType>
}

export type CarFuelType = 'Petrol' | 'Diesel' | 'Electric'
export type GearshiftType = 'Manual transmission' | 'Automatic transmission' | 'Continuously variable transmission (CVT)' | 'Semi-automatic and dual-clutch transmissions'

export type CarGeneralAmenitiesType = 'Spare tire'
    | 'Air Conditioner' | 'Bluetooth'
    | 'Backup Camera' | 'Heated Seats' |
    'Power Driver’s Seat'

export type CarSafetyAmenitiesType = 'Backup Camera' | 'Dual-Zone Climate Control'
export type CarOtherAmenitiesType = 'digital dashboard'

export type AddressType = {
    type: AddressTypeType,
    addressLocality: string,
    addressRegion: string,
    streetAddress: string,
    geoPoint: FirebaseFirestore.GeoPoint,
}

export type CarBodyType = "Micro" | "Sedan" | "Hatchback" | "Universal"
    | "Lift back" | "Coupe" | "Cabriolet" | "Roadster" | "Targa" | "Limousine"
    | "Muscle car" | "Sport car" | "Super car" | "SUV" | "Crossover" | "Pickup"
    | "Van" | "Minivan" | "Minibus" | "Camper van" | "Bus" | "Truck" | "Other"

export type AddressTypeType = "HOUSE" | "SCHOOL" | "OFFICE" | "SALES"
export type SteeringPositionValue = "Left Hand Driving" | "Right Hand Driving"

export type CurrencyType = "SLL" | "USD";
export type PriceType = {
    amount: number,
    currency: CurrencyType
}

export type ExperienceType = {
    trips: Array<TripType>
}

export type TripType = {
    touristType: TouristType,
    arrivalTime: string,
    departureTime: string,
    // offers:
    // demand:
}

export type CommentType = {
    children: Array<CommentType>,
    id: string,
    parentId: string,
    // createdAt: string,
    // updatedAt: string,
    // deletedAt: string,
    author: UserMetadataType,
    date: string,
    content: string,
    like: number,
}

export type TouristType = "NATIONAL" | "INTERNATIONAL";

export type HouseAmenitiesType = "key" | "shower" |
    "swimming-pool" | "tv" | "utensils" | "wifi" | "bath-tub" | "hot-tub"
    | "bed" | "gym"

export type HouseFacilitiesType =
    "swimming-pool" | "gym"


export type HouseRentalPropertyType = "House" | "Bed and breakfast" | "Apartment" | "Boutique" | "hotel" | "Bungalow" | "Chalet" | "Condominium" | "Cottage" | "Guest suite" | "Guesthouse" | "Other"
export type HouseSalesPropertyType = "House" | "Apartment" | "Boutique" | "hotel" | "Bungalow" | "Chalet" | "Condominium" | "Cottage" | "Other"

export type AssetOwnerType = {
    collectonName?: string,
    documentId?: string
    ismainAsset?:boolean
}
