import { toast } from "react-toastify";
import { AppDispatch } from "../redux/store";
import {
  addListing,
  deleteUserListing,
  getListings,
  getSingleListing,
  updateUserListing,
} from "../httpCommon";
import {
  deleteListingFailure,
  deleteListingStart,
  deleteListingSuccess,
  editListingFailure,
  editListingStart,
  editListingSuccess,
  getListingFailure,
  getListingStart,
  getListingSuccess,
} from "../redux/slice/listingSlice";
import { ApiError } from "../interfaces";

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
  } catch (error: unknown) {
    console.log(
      (error as ApiError)?.response?.data?.message ||
        "Error occurred while creating listing"
    );
  }
};

export const deleteListing = async (id: string, dispatch: AppDispatch) => {
  try {
    dispatch(deleteListingStart());
    console.log("coming here");
    const { data } = await deleteUserListing(id);
    console.log("ressss", data);
    if (data.success) {
      dispatch(deleteListingSuccess(id));
      toast.success(data.message);
      return;
    }
    dispatch(deleteListingFailure(data.message));
  } catch (error: unknown) {
    console.log(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while creating listing"
    );
  }
};

export const updateListing = async (
  listing: Listing,
  id: string,
  dispatch: AppDispatch
) => {
  try {
    dispatch(editListingStart());
    const { data } = await updateUserListing(listing, id);
    if (data.success) {
      dispatch(editListingSuccess(data.data));
      toast.success(data.message);
      return data;
    }
    dispatch(editListingFailure(data?.message));
    return data;
  } catch (error: unknown) {
    console.log(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while updating listing"
    );
  }
};

export const getListing = async (id: string, dispatch: AppDispatch) => {
  try {
    dispatch(getListingStart());
    const { data } = await getSingleListing(id);
    if (data.success) {
      // toast.success(data.message);
      return dispatch(getListingSuccess(data.data));
    }
    dispatch(
      getListingFailure(data?.message || "Error occure while get listing.")
    );
  } catch (error: unknown) {
    toast.error(
      (error as ApiError).response?.data?.message ||
        "Error occure while get listing."
    );
  }
};

export const fetchListing = async (searchQuery: string) => {
  console.log("fetch started");
  try {
    const { data } = await getListings(searchQuery);
    return data.data;
  } catch (error: unknown) {
    toast.error(
      (error as ApiError).response?.data?.message ||
        "Error occure while fetching listings."
    );
  }
};
