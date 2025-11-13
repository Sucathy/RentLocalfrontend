// import axios from "axios";
// import { useEffect, useState } from "react";

// const API_URL = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;

// const PriceSection = ({ pgId, onData }) => {
//     const [pgDetails, setPgDetails] = useState(null);
//     const [paymentType, setPaymentType] = useState("daily");
//     const [price, setPrice] = useState(0);

//     useEffect(() => {
//         const fetchPGDetails = async () => {
//             if (!pgId) return;

//             try {
//                 const res = await axios.get(`${API_URL}/${pgId}`);
//                 const data = res.data;

//                 if (!data) return;

//                 setPgDetails(data);

//                 // Determine payment type based on propertyType
//                 let type = "daily";
//                 let calculatedPrice = 0;

//                 const propertyType = data.propertyType;
//                 const isRentlyHouse = data.isRentlyHouse;

//                 if (propertyType === "PG") {
//                     type = "monthly";
//                     calculatedPrice = data.price?.monthly || 0;
//                 } else if (propertyType === "House") {
//                     type = isRentlyHouse ? "monthly" : "daily";
//                     calculatedPrice = type === "monthly" ? data.price?.monthly || 0 : data.price?.daily || 0;
//                 } else if (propertyType === "Flat") {
//                     type = "monthly";
//                     calculatedPrice = data.price?.monthly || 0;
//                 } else if (propertyType === "Guest House") {
//                     type = "daily";
//                     calculatedPrice = data.price?.daily || 0;
//                 } else if (propertyType === "Farm House") {
//                     type = "daily";
//                     calculatedPrice = data.price?.daily || 0;
//                 }

//                 setPaymentType(type);
//                 setPrice(calculatedPrice);

//                 // Send calculated price + paymentType to parent page
//                 if (onData) {
//                     onData({
//                         ...data,
//                         paymentType: type,
//                         calculatedPrice,
//                     });
//                 }
//             } catch (err) {
//                 console.error("Error fetching PG details:", err);
//             }
//         };

//         fetchPGDetails();
//     }, [pgId, onData]);

//     if (!pgDetails) return <div>Loading price info...</div>;

//     return (
//         <div className="price-section">
//             <h3>Price Info</h3>
//             <p>Property Type: {pgDetails.propertyType}</p>
//             {pgDetails.isRentlyHouse !== undefined && (
//                 <p>Rently House: {pgDetails.isRentlyHouse ? "Yes" : "No"}</p>
//             )}
//             <p>
//                 Price: ₹{price} / {paymentType}
//             </p>
//         </div>
//     );
// };

// export default PriceSection;
