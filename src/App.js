// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from "../src/Compenents/Home/Home";
// import Profile from "../src/Compenents/Home/MenuBar/Profile";
// import Trips from "../src/Compenents/Home/MenuBar/Trips/Trips";
// import { default as Message, default as Support, default as WishList } from "../src/Compenents/WishList/WishList";

// import HostHome from "../src/Pages/Host/HostHome/HostHome";
// import './App.css';
// import HomeCardDetails from "./Compenents/HomeCardDetails/HomeCardDetails";
// import HostLayout from "./Pages/Host/HostLayout";

// import CategoryFarmSection from "./Compenents/CategorySection/CategoryFarmSection";
// import CategoryFlastection from "./Compenents/CategorySection/CategoryFlatSection";
// import CategoryGuestHouseSection from "./Compenents/CategorySection/CategoryGuestHouseSection";
// import CategoryHouseSection from "./Compenents/CategorySection/CategoryHouseSection";
// import CategoryPGSection from "./Compenents/CategorySection/CategoryPGSection";


// import Step1PropertyType from "../src/Pages/Host/Step1PropertyType";
// import Step2Price from "../src/Pages/Host/Step2Price";
// import Step3RoomType from "../src/Pages/Host/Step3RoomType";
// import Step4Location from "../src/Pages/Host/Step4Location";
// import Step5Details from "../src/Pages/Host/Step5Details";
// import Step6Images from "../src/Pages/Host/Step6Images";
// import Step7Title from "../src/Pages/Host/Step7Title";
// import Step8Map from "../src/Pages/Host/Step8Map";
// import BhkType from "../src/Pages/Host/StepBHKType";
// import PgType from "../src/Pages/Host/StepPgType";
// function App() {

//   // const formData = { propertyType: "" };
//   return (
//     <Router>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/wishlist" element={<WishList />} />
//         <Route path="/trip" element={<Trips />} />
//         <Route path="/hostes" element={<HostLayout />} />
//         <Route path="/message" element={<Message />} />
//         <Route path="/support" element={<Support />} />
//         <Route path="/details/:id" element={<HomeCardDetails />} />
//       </Routes>

//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/pg" element={<CategoryPGSection />} />
//         <Route path="/house" element={<CategoryHouseSection />} />
//         <Route path="/flat-apartment" element={<s />} />
//         <Route path="/guest-house" element={<CategoryGuestHouseSection />} />
//         <Route path="/farm" element={<CategoryFarmSection />} />
//       </Routes>

//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/hostes" element={<HostHome />} />
//         <Route path="/house" element={<CategoryHouseSection />} />
//         <Route path="/flat-apartment" element={<CategoryFlastection />} />
//         <Route path="/guest-house" element={<CategoryGuestHouseSection />} />
//         <Route path="/farm" element={<CategoryFarmSection />} />
//       </Routes>
//       <Routes>
//         {/* Other routes */}
//         <Route path="/host" element={<HostLayout />}>
//           <Route path="property-type" element={<Step1PropertyType />} />
//           <Route path="pgtype" element={<PgType />} />
//           <Route path="bhktype" element={<BhkType />} />
//           <Route path="room-type" element={<Step3RoomType />} />
//           <Route path="location" element={<Step4Location />} />
//           <Route path="map" element={<Step8Map />} />
//           <Route path="details" element={<Step5Details />} />
//           <Route path="images" element={<Step6Images />} />
//           <Route path="price" element={<Step2Price />} />
//           <Route path="title" element={<Step7Title />} />
//         </Route>
//       </Routes>



//     </Router >
//   );
// }

// export default App;


import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Compenents/Home/Home";
import Profile from "./Compenents/Home/MenuBar/Profile";
import Support from "./Compenents/Home/MenuBar/support/Support";
import Trips from "./Compenents/Home/MenuBar/Trips/Trips";
import HomeCardDetails from "./Compenents/HomeCardDetails/HomeCardDetails";
import Message from "./Compenents/Message/Message";
import WishList from "./Compenents/WishList/WishList";
import HostHome from "./Pages/Host/HostHome/HostHome";
import HostLayout from "./Pages/Host/HostLayout";

import CategoryFarmSection from "./Compenents/CategorySection/CategoryFarmSection";
import CategoryFlatSection from "./Compenents/CategorySection/CategoryFlatSection";
import CategoryGuestHouseSection from "./Compenents/CategorySection/CategoryGuestHouseSection";
import CategoryHouseSection from "./Compenents/CategorySection/CategoryHouseSection";
import CategoryPGSection from "./Compenents/CategorySection/CategoryPGSection";

import Forgot from "./Compenents/Login/Forgot";
import Login from "./Compenents/Login/Login";
import SignUp from "./Compenents/Login/SignUp";
import HostListingEdit from "./Pages/Host/HostHome/HostListingEdit";

import Step1PropertyType from "./Pages/Host/Step1PropertyType";
import Step2Price from "./Pages/Host/Step2Price";
import Step3RoomType from "./Pages/Host/Step3RoomType";
import Step4Location from "./Pages/Host/Step4Location";
import Step5Details from "./Pages/Host/Step5Details";
import Step6Images from "./Pages/Host/Step6Images";
import Step7Title from "./Pages/Host/Step7Title";
import Step8Map from "./Pages/Host/Step8Map";
import BhkType from "./Pages/Host/StepBHKType";
import PgType from "./Pages/Host/StepPgType";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/trip" element={<Trips />} />
        <Route path="/message" element={<Message />} />
        <Route path="/support" element={<Support />} />
        <Route path="/details/:id" element={<HomeCardDetails />} />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Category Pages */}
        <Route path="/pg" element={<CategoryPGSection />} />
        <Route path="/house" element={<CategoryHouseSection />} />
        <Route path="/flat-apartment" element={<CategoryFlatSection />} />
        <Route path="/guest-house" element={<CategoryGuestHouseSection />} />
        <Route path="/farm" element={<CategoryFarmSection />} />

        {/* Host Pages */}
        <Route path="/hostes" element={<HostHome />} />
        <Route path="/host" element={<HostLayout />}>
          {/* Nested Steps */}
          <Route path="property-type" element={<Step1PropertyType />} />
          <Route path="pgtype" element={<PgType />} />
          <Route path="bhktype" element={<BhkType />} />
          <Route path="room-type" element={<Step3RoomType />} />
          <Route path="location" element={<Step4Location />} />
          <Route path="map" element={<Step8Map />} />
          <Route path="details" element={<Step5Details />} />
          <Route path="images" element={<Step6Images />} />
          <Route path="price" element={<Step2Price />} />
          <Route path="title" element={<Step7Title />} />
          <Route path="edit-listing/:id" element={<HostListingEdit />} />
        </Route>
        {/*  */}
      </Routes>
    </Router>
  );
}

export default App;
