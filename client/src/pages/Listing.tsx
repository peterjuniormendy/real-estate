import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../controllers/listingController";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
} from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Contact from "../components/Contact";
import { Listing as ListingType } from "../interfaces";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentListing, loading, error } = useAppSelector(
    (state) => state.listings
  ) as {
    currentListing: ListingType | null;
    loading: boolean;
    error: string | null;
  };

  const [showContactForm, setShowContactForm] = useState(false);

  const fetchListing = useCallback(async () => {
    try {
      if (id) {
        await getListing(id, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">
          {error || "Something went wrong."}
        </p>
      )}
      {currentListing && !loading && !error && (
        <>
          <Swiper navigation>
            {currentListing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px] relative"
                  style={{
                    background: `url("${url}") center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <FaRegShareFromSquare
                    className="text-3xl text-black absolute top-5 right-5"
                    onClick={handleCopy}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="max-w-6xl mx-auto p-4 pt-6 space-y-4">
            <div className="mt-10">
              <p className="text-2xl font-bold">
                {currentListing.name} : $
                {currentListing.offer
                  ? currentListing.discountPrice?.toLocaleString("en-UK")
                  : currentListing.regularPrice?.toLocaleString("en-UK")}
                {currentListing.type === "rent" && " /month"}
              </p>
              <p className="flex item-center mt-6 gap-2 text-slate-600 my-2 text-sm">
                <FaMapMarkedAlt className="text-green-700 text-lg" />
                {currentListing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full text-white max-w-[200px] text-center rounded-md p-1">
                  {currentListing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {currentListing.offer && (
                  <p className="bg-green-900 w-full text-white max-w-[200px] text-center rounded-md p-1">
                    -$
                    {+currentListing.regularPrice -
                      +currentListing.discountPrice}{" "}
                    off
                  </p>
                )}
              </div>
            </div>
            <p className="text-slate-600">
              <span className="font-semibold"> Description - </span>
              {currentListing.description}
            </p>
            <ul className="text-green-700 font-semibold text-sm flex flex-wrap gap-4">
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaBed className=" text-lg" />
                {currentListing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaBath className=" text-lg" />
                {currentListing.bathrooms > 1 ? "bathrooms" : "Bathroom"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaParking className=" text-lg" />
                {currentListing.parking ? "Parking spot" : "No parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaChair className=" text-lg" />
                {currentListing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {/* Condition to be change later. Button should only show for the non poster on the property. */}
            {currentListing.userRef && !showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full py-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
              >
                Contact landlord
              </button>
            )}
            {showContactForm && <Contact listing={currentListing} />}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
