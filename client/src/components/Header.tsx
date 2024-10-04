import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-600">Quick</span>
            <span className="text-[#132257]">Home</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex items-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:text-slate-900 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-slate-900 hover:underline">
              About
            </li>
          </Link>
          {user && (
            <Link to="/my-listings">
              <li className="hidden sm:inline text-slate-700 hover:text-slate-900 hover:underline">
                My Listings
              </li>
            </Link>
          )}
          <Link to={user ? "profile" : "/login"}>
            {user ? (
              <img
                src={user?.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <li className=" text-slate-700 hover:text-slate-900 hover:underline">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
