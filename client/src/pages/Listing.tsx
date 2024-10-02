import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../controllers/listingController";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentListing, loading, error } = useAppSelector(
    (state) => state.listings
  );

  const fetchListing = async () => {
    try {
      await getListing(id, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);
  console.log("current listing", currentListing);
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
            {currentListing?.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
