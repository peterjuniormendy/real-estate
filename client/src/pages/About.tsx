import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto ">
      <h1 className="text-3xl font-bold mb-4">
        About <span className="text-red-600"> Quick</span>
        <span className="text-[#132257]">Home</span> Estate{" "}
      </h1>
      <p className="text-slate-700 mb-4">
        QuickHome Estate is a real estate company that specializes in buying and
        selling properties. We have a team of experienced professionals who are
        dedicated to providing the best possible service to our clients.
      </p>
      <p className="text-slate-700 mb-4">
        Our mission is to provide a seamless and stress-free experience for our
        clients, from the initial consultation to the final sale. We strive to
        build long-term relationships with our clients and to provide them with
        the best possible results.
      </p>
      <p className="text-slate-700 mb-4">
        At QuickHome Estate, we understand the importance of finding the right
        property for our clients. We take the time to listen to their needs and
        preferences, and we work tirelessly to find the perfect property for
        them.
      </p>
      <Link
        to="/search"
        className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
      >
        Get stated
      </Link>
    </div>
  );
};

export default About;
