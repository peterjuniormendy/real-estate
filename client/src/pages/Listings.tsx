import { useEffect } from "react";
import { getAllUserListing } from "../controllers/userController";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const Listings = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { listings } = useAppSelector((state) => state.listings);

  const fetchListing = async () => {
    try {
      getAllUserListing(user, dispatch);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // listings.length < 0 && fetchListing();
    fetchListing();
  }, []);

  console.log(listings);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Your Listings</h1>
      <div>
        Listings page
        <button type="button" onClick={fetchListing}>
          fetch listing
        </button>
      </div>
      <div></div>
    </main>
  );
};

export default Listings;
