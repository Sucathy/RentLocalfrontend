
// // import axios from "axios";
// // import "leaflet/dist/leaflet.css";
// // import { ArrowLeft, X } from "lucide-react";
// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import Fotter from "../Home/Fotter/Fotter";
// // import Navbar from "../Home/Navbar";
// // import PaymentPage from "../Payment/PaymentPage";
// // import AmenitiesSection from "./AmenitysPage/AmenitiesSection";
// // import "./HomeCardDetails.css";
// // import LocationMap from "./LocationMap/LocationMap";

// // const API_URL = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;

// // const HomeCardDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [pg, setPg] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [showImageModal, setShowImageModal] = useState(false);
// //   const [coordinates, setCoordinates] = useState(null);

// //   useEffect(() => {
// //     const fetchPGDetail = async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/${id}`);
// //         const pgData = res.data;
// //         setPg(pgData);

// //         const lat = parseFloat(pgData.latitude);
// //         const lng = parseFloat(pgData.longitude);
// //         if (!isNaN(lat) && !isNaN(lng)) setCoordinates({ lat, lng });
// //       } catch (err) {
// //         console.error("❌ Failed to fetch PG details:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) fetchPGDetail();
// //   }, [id]);

// //   if (loading) return <div className="pg-details-container">Loading...</div>;
// //   if (!pg) return <div className="pg-details-container">PG not found.</div>;

// //   // ------------------- Compute Deposit -------------------
// //   const getDepositAmount = () => {
// //     if (!pg.deposit || !pg.propertyType) return null;

// //     const type = pg.propertyType.toLowerCase();
// //     const bhk = pg.bhkType; // "1BHK", "2BHK", etc.

// //     if (type === "pg" && pg.deposit.pgDeposit) {
// //       return `${pg.deposit.pgDeposit.amount} ₹ (Refundable: ${pg.deposit.pgDeposit.refundableNote})`;
// //     }

// //     if ((type === "house" || type === "flat") && bhk) {
// //       const depositObj = type === "house" ? pg.deposit.houseDeposit : pg.deposit.flatDeposit;
// //       if (depositObj && depositObj[bhk]) return `${depositObj[bhk]} ₹`;
// //     }

// //     return null;
// //   };

// //   const depositAmount = getDepositAmount();

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="pg-details-container">
// //         {/* ---------- Back Button ---------- */}
// //         <button className="back-btn" onClick={() => navigate(-1)}>
// //           <ArrowLeft size={18} /> Back
// //         </button>

// //         {/* ---------- IMAGE GALLERY ---------- */}
// //         <div className="pg-gallery">
// //           {pg.images?.slice(0, 5).map((imgUrl, idx) => (
// //             <img key={idx} src={imgUrl} alt={`${pg.name} view ${idx + 1}`} className="pg-image" />
// //           ))}
// //           {pg.images?.length > 5 && (
// //             <button className="show-more-btn" onClick={() => setShowImageModal(true)}>
// //               {pg.images.length > 5 ? `+${pg.images.length - 5} More` : "View All"}
// //             </button>
// //           )}
// //         </div>

// //         {/* ---------- IMAGE MODAL ---------- */}
// //         {showImageModal && (
// //           <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
// //             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //               <button className="close-btn" onClick={() => setShowImageModal(false)}>
// //                 <X size={24} />
// //               </button>
// //               <div className="modal-gallery">
// //                 {pg.images?.map((imgUrl, i) => (
// //                   <img key={i} src={imgUrl} alt={`Gallery ${i + 1}`} />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* ---------- PG INFO ---------- */}
// //         <div className="pg-info-header">
// //           <h2>₹{pg.price}/m</h2>
// //           <h2>{pg.name}</h2>
// //           <p>{pg.location}</p>
// //           {depositAmount && (
// //             <p className="pg-deposit">
// //               Deposit: <strong>{depositAmount}</strong>
// //             </p>
// //           )}
// //         </div>

// //         <div className="pg-info-wrapper">
// //           <div className="pg-info-left">
// //             <AmenitiesSection amenities={pg.amenities} />
// //             <div className="pg-card-description">
// //               <p className="pg-description">{pg.description}</p>
// //             </div>
// //           </div>

// //           {/* Right Column */}
// //           <div className="pg-info-right">
// //             <PaymentPage />
// //           </div>
// //         </div>

// //         {/* ---------- MAP SECTION ---------- */}
// //         <LocationMap coordinates={coordinates} name={pg.name} location={pg.location} />
// //       </div>
// //       <Fotter />
// //     </>
// //   );
// // };

// // export default HomeCardDetails;


// import axios from "axios";
// import "leaflet/dist/leaflet.css";
// import { ArrowLeft, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Fotter from "../Home/Fotter/Fotter";
// import Navbar from "../Home/Navbar";
// import PaymentPage from "../Payment/PaymentPage";
// import AmenitiesSection from "./AmenitysPage/AmenitiesSection";
// import "./HomeCardDetails.css";
// import LocationMap from "./LocationMap/LocationMap";

// const API_URL = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;

// const HomeCardDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [pg, setPg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [coordinates, setCoordinates] = useState(null);

//   useEffect(() => {
//     const fetchPGDetail = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/${id}`);
//         const pgData = res.data;
//         setPg(pgData);

//         const lat = parseFloat(pgData.latitude);
//         const lng = parseFloat(pgData.longitude);
//         if (!isNaN(lat) && !isNaN(lng)) setCoordinates({ lat, lng });
//       } catch (err) {
//         console.error("❌ Failed to fetch PG details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchPGDetail();
//   }, [id]);

//   if (loading) return <div className="pg-details-container">Loading...</div>;
//   if (!pg) return <div className="pg-details-container">PG not found.</div>;

//   // ------------------- Compute Deposit -------------------
//   const getDepositAmount = () => {
//     if (!pg.deposit || !pg.propertyType) return null;

//     const type = pg.propertyType.toLowerCase();
//     const bhkKey = pg.bhkType?.toLowerCase();

//     if (type === "pg" && pg.deposit.pgDeposit) {
//       return `${pg.deposit.pgDeposit.amount} ₹ (Refundable: ${pg.deposit.pgDeposit.refundableNote})`;
//     }

//     if ((type === "house" || type === "flat / apartment") && bhkKey) {
//       const depositObj = type === "house" ? pg.deposit.houseDeposit : pg.deposit.flatDeposit;
//       if (depositObj && depositObj[bhkKey]) return `₹ ${depositObj[bhkKey]} `;
//     }

//     return null;
//   };

//   const depositAmount = getDepositAmount();

//   return (
//     <>
//       <Navbar />
//       <div className="pg-details-container">
//         {/* ---------- Back Button ---------- */}
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* ---------- IMAGE GALLERY ---------- */}
//         <div className="pg-gallery">
//           {pg.images?.slice(0, 5).map((imgUrl, idx) => (
//             <img key={idx} src={imgUrl} alt={`${pg.name} view ${idx + 1}`} className="pg-image" />
//           ))}
//           {pg.images?.length > 5 && (
//             <button className="show-more-btn" onClick={() => setShowImageModal(true)}>
//               +{pg.images.length - 5} More
//             </button>
//           )}
//         </div>

//         {/* ---------- IMAGE MODAL ---------- */}
//         {showImageModal && (
//           <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <button className="close-btn" onClick={() => setShowImageModal(false)}>
//                 <X size={24} />
//               </button>
//               <div className="modal-gallery">
//                 {pg.images?.map((imgUrl, i) => (
//                   <img key={i} src={imgUrl} alt={`Gallery ${i + 1}`} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ---------- PG INFO ---------- */}
//         <div className="pg-info-header">
//           <h2>₹{pg.price}/m</h2>
//           <h2>{pg.name}</h2>
//           <p>{pg.location}</p>
//           {depositAmount && (
//             <p className="pg-deposit">
//               Deposit: <strong>{depositAmount}</strong>
//             </p>
//           )}
//         </div>

//         <div className="pg-info-wrapper">
//           <div className="pg-info-left">
//             <AmenitiesSection amenities={pg.amenities} />
//             <div className="pg-card-description">
//               <p className="pg-description">{pg.description}</p>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="pg-info-right">
//             <PaymentPage />
//           </div>
//         </div>

//         {/* ---------- MAP SECTION ---------- */}
//         {coordinates && (
//           <LocationMap coordinates={coordinates} name={pg.name} location={pg.location} />
//         )}
//       </div>
//       <Fotter />
//     </>
//   );
// };

// export default HomeCardDetails;


import axios from "axios";
import "leaflet/dist/leaflet.css";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fotter from "../Home/Fotter/Fotter";
import Navbar from "../Home/Navbar";
import PaymentPage from "../Payment/PaymentPage";
import AmenitiesSection from "./AmenitysPage/AmenitiesSection";
import "./HomeCardDetails.css";
import LocationMap from "./LocationMap/LocationMap";

const API_URL = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;

const HomeCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchPGDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const pgData = res.data;
        setPg(pgData);

        const lat = parseFloat(pgData.latitude);
        const lng = parseFloat(pgData.longitude);
        if (!isNaN(lat) && !isNaN(lng)) setCoordinates({ lat, lng });
      } catch (err) {
        console.error("❌ Failed to fetch PG details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPGDetail();
  }, [id]);

  if (loading) return <div className="pg-details-container">Loading...</div>;
  if (!pg) return <div className="pg-details-container">PG not found.</div>;

  // ------------------- Compute Deposit -------------------
  const getDepositAmount = () => {
    if (!pg.deposit || !pg.propertyType) return null;

    const type = pg.propertyType.toLowerCase();
    const bhkKey = pg.bhkType?.toLowerCase(); // optional

    // ✅ PG deposit
    if (type === "pg" && pg.deposit.pgDeposit) {
      return `${pg.deposit.pgDeposit.amount} ₹ (Refundable: ${pg.deposit.pgDeposit.refundableNote})`;
    }

    // ✅ House, Flat/Apartment, Guest House, Farm
    if (
      ["house", "flat / apartment", "guest house", "farm"].includes(type)
    ) {
      let depositObj;

      switch (type) {
        case "house":
          depositObj = pg.deposit.houseDeposit;
          break;
        case "flat / apartment":
          depositObj = pg.deposit.flatDeposit;
          break;
        case "guest house":
          depositObj = pg.deposit.guestHouseDeposit || pg.deposit.flatDeposit; // fallback
          break;
        case "farm":
          depositObj = pg.deposit.farmDeposit || pg.deposit.houseDeposit; // fallback
          break;
        default:
          depositObj = null;
      }

      if (depositObj) {
        // if BHK exists in deposit object
        if (bhkKey && depositObj[bhkKey]) return `₹ ${depositObj[bhkKey]}`;
        // fallback: first deposit value
        const firstDeposit = Object.values(depositObj)[0];
        if (firstDeposit) return `₹ ${firstDeposit}`;
      }
    }

    return null;
  };

  const depositAmount = getDepositAmount();

  return (
    <>
      <Navbar />
      <div className="pg-details-container">
        {/* ---------- Back Button ---------- */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        {/* ---------- IMAGE GALLERY ---------- */}
        <div className="pg-gallery">
          {pg.images?.slice(0, 5).map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} alt={`${pg.name} view ${idx + 1}`} className="pg-image" />
          ))}
          {pg.images?.length > 5 && (
            <button className="show-more-btn" onClick={() => setShowImageModal(true)}>
              +{pg.images.length - 5} More
            </button>
          )}
        </div>

        {/* ---------- IMAGE MODAL ---------- */}
        {showImageModal && (
          <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowImageModal(false)}>
                <X size={24} />
              </button>
              <div className="modal-gallery">
                {pg.images?.map((imgUrl, i) => (
                  <img key={i} src={imgUrl} alt={`Gallery ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- PG INFO ---------- */}
        <div className="pg-info-header">
          <h2>₹{pg.price}/m</h2>
          <h2>{pg.title}</h2>
          <p>{pg.location}</p>
          {/* <p>{pg.details} */}

          {/* </p> */}
          {depositAmount && (
            <p className="pg-deposit">
              Deposit: <strong>{depositAmount}</strong>
            </p>
          )}
          <p> {pg.details && (
            <div className="pg-details-summary">
              <p>
                🧍‍♂️ {pg.details.guests || 0} Guests • 🛏️ {pg.details.bedrooms || 0} Bedrooms • 🛌{" "}
                {pg.details.beds || 0} Beds • 🚿 {pg.details.bathrooms || 0} Bathrooms
              </p>
            </div>
          )}</p>

        </div>


        <div className="pg-info-wrapper">
          <div className="pg-info-left">
            <AmenitiesSection amenities={pg.amenities} />
            <div className="pg-card-description">
              <p className="pg-description">{pg.description}</p>
            </div>
          </div>

          <div className="pg-info-right">
            <PaymentPage />
          </div>
        </div>

        {/* ---------- MAP SECTION ---------- */}
        {coordinates && (
          <LocationMap coordinates={coordinates} name={pg.title} location={pg.location} />
        )}
      </div>
      <Fotter />
    </>
  );
};

export default HomeCardDetails;
