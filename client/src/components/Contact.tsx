import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../controllers/userController";

const Contact = ({ listing }) => {
  const [landlordData, setLoadlordData] = useState(null);
  const [message, setMessage] = useState("");
  const fetchUserDetails = async () => {
    const { data } = await getUser(listing.userRef);
    setLoadlordData(data);
  };
  useEffect(() => {
    fetchUserDetails();
  }, [listing.userRef]);
  return (
    <>
      {landlordData && (
        <div>
          <p className="text-slate-700">
            Contact{" "}
            <span className="font-semibold">
              {landlordData?.username?.toLowerCase()}
            </span>{" "}
            for <span>{listing?.name?.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            className="w-full mt-1 rounded-lg p-2 text-slate-600"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
            {message}
          </textarea>
          <Link
            to={`mailto:${landlordData?.email}?subject=${encodeURIComponent(
              `Regarding ${listing?.name}`
            )}&body=${encodeURIComponent(message)}`}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mt-2 rounded-lg opacity-95 w-full uppercase">
              Send Message
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
