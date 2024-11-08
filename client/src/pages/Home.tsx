import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { fetchListing } from "../controllers/listingController";
import ListingCard from "../components/ListingCard";
import { Listing } from "../interfaces";

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState<Listing[]>([]);
  const [salesListings, setSalesListings] = useState<Listing[]>([]);
  const [rentListings, setRentListings] = useState<Listing[]>([]);

  const fetchOfferListings = async (): Promise<void> => {
    const searchParam = new URLSearchParams({
      offer: true.toString(),
      limit: "3",
    });

    const response = await fetchListing(searchParam.toString());
    setOfferListings(response);
  };
  const fetchSalesListing = async (): Promise<void> => {
    const searchParam = new URLSearchParams({
      type: "sale",
      limit: "3",
    });

    const response = await fetchListing(searchParam.toString());
    setSalesListings(response);
  };
  const fetchRentListings = async (): Promise<void> => {
    const searchParam = new URLSearchParams({
      type: "rent",
      limit: "3",
    });

    const response = await fetchListing(searchParam.toString());
    setRentListings(response);
  };

  useEffect(() => {
    fetchOfferListings();
    fetchSalesListing();
    fetchRentListings();
  }, []);
  return (
    <div>
      <section className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          QuickHome estate is the best place to find your next perfect house to
          live. <br />
          We have a wide range of houses for sale and rent in different
          locations.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Get stated
        </Link>
      </section>
      <section>
        <Swiper navigation>
          {offerListings?.length > 0 &&
            offerListings.map((listing, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url("${listing.imageUrls[0]}") center no-repeat`,
                    backgroundSize: "cover",
                    height: "500px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <section>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  to={`/search?offer=true`}
                  className="text-sm text-blue-700 hover:underline"
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {rentListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent houses for rent
                </h2>
                <Link
                  to={`/search?type=rent`}
                  className="text-sm text-blue-700 hover:underline"
                >
                  Show more houses for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing: Listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {salesListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent houses for sale
                </h2>
                <Link
                  to={`/search?type=sale`}
                  className="text-sm text-blue-700 hover:underline"
                >
                  Show more houses for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {salesListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
