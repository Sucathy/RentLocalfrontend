// import axios from "axios";
// import { useEffect, useState } from "react";

// const Trips = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const res = await axios.get(
//                     `${process.env.REACT_APP_API_BASE}/api/bookings/my`,
//                     { withCredentials: true } // ✅ send JWT cookie
//                 );
//                 setBookings(res.data.bookings || []);
//             } catch (err) {
//                 console.error("Error fetching trips:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBookings();
//     }, []);

//     if (loading) return <p>Loading trips...</p>;

//     if (bookings.length === 0)
//         return <p>No bookings yet. Go explore PGs and book your first stay!</p>;

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-semibold mb-4">My Trips</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bookings.map((b) => (
//                     <div
//                         key={b._id}
//                         className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
//                     >
//                         <img
//                             src={b.pgId?.images?.[0]}
//                             alt={b.pgId?.name}
//                             className="w-full h-40 object-cover rounded-xl mb-3"
//                         />
//                         <h3 className="text-lg font-bold">{b.pgId?.name}</h3>
//                         <p className="text-gray-600">{b.pgId?.location}</p>
//                         <p className="text-gray-800 mt-2">
//                             <strong>Check-in:</strong>{" "}
//                             {new Date(b.checkIn).toLocaleDateString()}
//                         </p>
//                         <p className="text-gray-800">
//                             <strong>Check-out:</strong>{" "}
//                             {new Date(b.checkOut).toLocaleDateString()}
//                         </p>
//                         <p className="font-semibold mt-2">₹{b.totalAmount}</p>
//                         <span className="text-green-600 font-medium">
//                             {b.paymentStatus}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Trips;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trips.css"; // ✅ Import CSS file
const Trips = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_BASE}/api/bookings/my`,
                    { withCredentials: true }
                );
                setBookings(res.data.bookings || []);
            } catch (err) {
                console.error("Error fetching trips:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <p className="loading-text">Loading trips...</p>;

    if (bookings.length === 0)
        return (
            <p className="empty-text">
                No bookings yet. Go explore PGs and book your first stay!
            </p>
        );
    const handleBack = () => {
        navigate("/"); // Back to home
    };


    return (
        <div className="trips-container">
            <button className="back-btn" onClick={handleBack}>
                {/* <FaArrowLeft /> Back */} back
            </button>
            <h2
                className="trips-title"
                onClick={() => navigate("/")} // ✅ navigate to home page
                style={{ cursor: "pointer", color: "#007bff" }} // optional styling
            >
                My Trips
            </h2>
            <div className="trips-grid">
                {bookings.map((b) => (
                    <div key={b._id} className="trip-card">
                        <img
                            src={b.pgId?.images?.[0] || "https://via.placeholder.com/300x200"}
                            alt={b.pgId?.name}
                            className="trip-image"
                        />
                        <div className="trip-content">
                            <h3 className="trip-name">{b.pgId?.name}</h3>
                            <p className="trip-location">{b.pgId?.location}</p>

                            <div className="trip-dates">
                                <p>
                                    <strong>Check-in:</strong>{" "}
                                    {new Date(b.checkIn).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Check-out:</strong>{" "}
                                    {new Date(b.checkOut).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="trip-footer">
                                <span className="trip-price">₹{b.totalAmount}</span>
                                <span
                                    className={`trip-status ${b.paymentStatus === "Paid" ? "paid" : "pending"
                                        }`}
                                >
                                    {b.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trips;

