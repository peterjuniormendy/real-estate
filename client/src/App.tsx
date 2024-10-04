import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Listings from "./pages/Listings";
import PrivateRoute from "./components/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateListing from "./pages/UpdateListing";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<Listing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
