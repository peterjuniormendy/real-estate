import React, { useEffect } from "react";
import { getAllUserListing } from "../controllers/userController";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const Listings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { listings } = useAppSelector((state) => state.listings);

  const fetchListing = async () => {
    try {
      await getAllUserListing(user, dispatch);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    if (listings.length === 0) {
      fetchListing();
    }
  }, [listings.length, user]);

  console.log(listings);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Your Listings</h1>
      <div>
        <button
          type="button"
          onClick={fetchListing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh Listings
        </button>
      </div>
      <div>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="border p-4 my-2 rounded">
              {/* Display listing details here */}
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
            </div>
          ))
        ) : (
          <p>
            No listings found. Click 'Refresh Listings' to fetch your listings.
          </p>
        )}
      </div>
    </main>
  );
};

export default Listings;
