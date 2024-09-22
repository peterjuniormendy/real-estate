import { getAllUserListing } from "../controllers/userController";
import { useAppSelector } from "../redux/hooks";

const Listings = () => {
  const { user } = useAppSelector((state) => state.user);

  const fetchListing = async () => {
    try {
      const data = await getAllUserListing(user);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      Listings page
      <button type="button" onClick={fetchListing}>
        fetch listing
      </button>
    </div>
  );
};

export default Listings;
