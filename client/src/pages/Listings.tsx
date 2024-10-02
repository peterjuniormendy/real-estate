import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteListing } from "../controllers/listingController";
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

  const handleDelete = async (id: string) => {
    try {
      await deleteListing(id, dispatch);
      fetchListing();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Your Listings</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={fetchListing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh Listings
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95"
        >
          Create Listing
        </Link>
      </div>
      <div>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="border p-4 my-2 rounded flex items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover image"
                  className="w-20 h-16 object-contain"
                />
              </Link>
              <Link
                className="font-semibold flex-1 truncate hover:underline"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="space-x-4">
                <button
                  type="button"
                  className="p-4 bg-green-300 rounded-sm shadow-lg active:shadow-none"
                >
                  <FaEdit className="text-green-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(listing._id)}
                  className="p-4 bg-red-300 rounded-sm shadow-lg active:shadow-none"
                >
                  <FaTrash className="text-red-600" />
                </button>
              </div>
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
