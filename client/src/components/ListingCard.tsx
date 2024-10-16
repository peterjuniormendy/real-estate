import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover image"
          className="h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaLocationPin className="w-4 h-4 text-green-700" />
            <p className="text-gray-600 text-sm truncate">{listing?.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing?.description}
          </p>

          <p className="text-slate-500 font-semibold mt-2">
            $
            {listing.offer
              ? listing.discountPrice?.toLocaleString("en-UK")
              : listing.regularPrice?.toLocaleString("en-UK")}
            {listing.type === "rent" && " /month"}
          </p>
          <ul className="text-slate-700 font-semibold text-sm flex flex-wrap gap-4">
            <li className="flex items-center gap-2 whitespace-nowrap ">
              <FaBed className=" text-lg" />
              {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
            </li>
            <li className="flex items-center gap-2 whitespace-nowrap ">
              <FaBath className=" text-lg" />
              {listing.bathrooms > 1 ? "bathrooms" : "Bedroom"}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
