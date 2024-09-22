import { addListing } from "../httpCommon";

interface Listing {
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  regularPrice: number;
  discountPrice: number;
  offer: boolean;
  parking: boolean;
  furnished: boolean;
}

export const createListing = async (listing: Listing) => {
  try {
    const { data } = await addListing(listing);
    if (data.success) {
      return data;
    }
  } catch (error: object | any) {
    console.log(
      error.response.data.message || "Error occure while creating listing"
    );
  }
};
