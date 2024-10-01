import { toast } from "react-toastify";
import { addListing, deleteUserListing } from "../httpCommon";
import {
  deleteListingFailure,
  deleteListingStart,
  deleteListingSuccess,
} from "../redux/slice/listingSlice";

interface Dispatch {
  (action: any): void;
}

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

export const deleteListing = async (id: string, dispatch: Dispatch) => {
  try {
    dispatch(deleteListingStart());
    console.log("coming here");
    const { data } = await deleteUserListing(id);
    console.log("ressss", data);
    if (data.success) {
      dispatch(deleteListingSuccess(id));
      toast.success(data.message);
    }
  } catch (error: object | any) {
    console.log(
      error.response.data.message || "Error occure while creating listing"
    );
    dispatch(deleteListingFailure(error.response?.data?.message));
  }
};
