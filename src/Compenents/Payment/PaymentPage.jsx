
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import CalendarPage from "../Calendar/CalendarPage";
// import "./PaymentPage.css";

// const BACKEND_URL = process.env.REACT_APP_API_BASE || "http://localhost:5000";

// const PaymentPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [pg, setPg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [bookedRanges, setBookedRanges] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [user, setUser] = useState(null);


//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
//           withCredentials: true, // send cookies for JWT auth
//         });
//         setUser(res.data);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };
//     fetchUser();
//   }, []);



//   // ✅ Fetch PG details
//   useEffect(() => {
//     const fetchPgDetails = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/pgdetails/${id}`);
//         setPg(res.data);
//         setBookedRanges(res.data.bookedRanges || []);
//       } catch (err) {
//         console.error("Error fetching PG:", err);
//         alert("Failed to load PG details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPgDetails();
//   }, [id]);

//   // ✅ Handle date selection
//   const handleDateSelect = (from, to) => {
//     setCheckIn(from);
//     setCheckOut(to);
//     if (from && to) setTimeout(() => setOpenModal(false), 300);
//   };

//   // ✅ Check for overlap
//   const isOverlapping = (from, to) => {
//     return bookedRanges.some(
//       (range) =>
//         new Date(from) <= new Date(range.to) &&
//         new Date(to) >= new Date(range.from)
//     );
//   };

//   // ✅ Handle Razorpay Payment + Booking
//   const handlePayment = async () => {
//     if (!checkIn || !checkOut) {
//       alert("Please select check-in and check-out dates.");
//       return;
//     }

//     if (isOverlapping(checkIn, checkOut)) {
//       alert("❌ Selected dates are already booked. Please choose another range.");
//       return;
//     }

//     setPaymentLoading(true);

//     try {
//       // 1️⃣ Create Razorpay Order
//       const { data } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, {
//         amount: Number(pg.price),
//         currency: "INR",
//       });

//       // 2️⃣ Configure Razorpay
//       const options = {
//         key: "rzp_test_RXPoTXzZb44ief", // ⚠️ Replace with your key
//         amount: data.amount,
//         currency: data.currency,
//         name: "PG Local",
//         description: `${pg.propertyType} - ${pg.title || pg.name}`,
//         order_id: data.id,
//         handler: async (response) => {
//           try {
//             // 3️⃣ Verify Payment
//             const verify = await axios.post(`${BACKEND_URL}/api/payment/verify-payment`, response);

//             if (verify.data.success) {
//               // 4️⃣ Book Dates after successful payment
//               const bookingRes = await axios.patch(
//                 `${BACKEND_URL}/api/pgdetails/${id}/book-range`,
//                 {
//                   from: checkIn.toISOString(),
//                   to: checkOut.toISOString(),
//                   totalAmount: Number(pg.price),
//                   userEmail: user?.email,   // ✅ dynamically from logged-in user
//                   userName: user?.username,
//                 },
//                 {
//                   withCredentials: true,
//                   headers: { "Content-Type": "application/json" },
//                 }
//               );

//               if (bookingRes.status === 200) {
//                 setBookedRanges(bookingRes.data.bookedRanges);
//                 alert(
//                   `✅ Payment Successful & Booking Confirmed!\n${checkIn.toDateString()} → ${checkOut.toDateString()}`
//                 );
//                 navigate("/");
//               } else {
//                 alert("⚠️ Payment succeeded, but booking failed. Please contact support.");
//               }
//             } else {
//               alert("❌ Payment verification failed.");
//             }
//           } catch (err) {
//             console.error("Booking after payment error:", err);
//             alert("⚠️ Payment successful but booking failed.");
//           }
//         },
//         prefill: {
//           name: "Test User",
//           email: "test@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#2563eb" },
//       };

//       // 5️⃣ Open Razorpay
//       new window.Razorpay(options).open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("❌ Payment initialization failed.");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-20">Loading PG details...</div>;
//   if (!pg) return <div className="text-center mt-20 text-red-600">PG not found ❌</div>;

//   return (
//     <div className="payment-card">
//       <h2>{pg.title || pg.name}</h2>
//       <p className="pg-type">{pg.propertyType}</p>
//       <p className="pg-price">Price ₹{pg.price}</p>

//       {/* ✅ Check-in / Check-out Inputs */}
//       <div className="checkin-checkout-section">
//         <input
//           type="text"
//           value={checkIn ? checkIn.toDateString() : ""}
//           placeholder="Select Check-in"
//           readOnly
//           onClick={() => setOpenModal(true)}
//         />
//         <input
//           type="text"
//           value={checkOut ? checkOut.toDateString() : ""}
//           placeholder="Select Check-out"
//           readOnly
//           onClick={() => setOpenModal(true)}
//         />
//       </div>

//       {/* ✅ Payment Button */}
//       <button
//         onClick={handlePayment}
//         className="payment-btn"
//         disabled={paymentLoading || !checkIn || !checkOut}
//       >
//         {paymentLoading ? "Processing..." : `Pay ₹${pg.price}`}
//       </button>

//       <p className="secure-text">Secure payments powered by Razorpay 🔒</p>

//       {/* ✅ Calendar Modal */}
//       {openModal && (
//         <div
//           className="calendar-modal"
//           onClick={(e) => {
//             if (e.target.className === "calendar-modal") setOpenModal(false);
//           }}
//         >
//           <div className="calendar-modal-content">
//             <CalendarPage
//               pgId={pg._id}
//               checkIn={checkIn}
//               checkOut={checkOut}
//               propertyType={pg.propertyType}
//               bookedRanges={bookedRanges}
//               onDateSelect={handleDateSelect}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarPage from "../Calendar/CalendarPage";
import "./PaymentPage.css";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
          withCredentials: true, // send cookies for JWT auth
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);



  // ✅ Fetch PG details
  useEffect(() => {
    const fetchPgDetails = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/pgdetails/${id}`);
        setPg(res.data);
        setBookedRanges(res.data.bookedRanges || []);
      } catch (err) {
        console.error("Error fetching PG:", err);
        alert("Failed to load PG details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPgDetails();
  }, [id]);

  // ✅ Handle date selection
  const handleDateSelect = (from, to) => {
    setCheckIn(from);
    setCheckOut(to);
    if (from && to) setTimeout(() => setOpenModal(false), 300);
  };

  // ✅ Check for overlap
  const isOverlapping = (from, to) => {
    return bookedRanges.some(
      (range) =>
        new Date(from) <= new Date(range.to) &&
        new Date(to) >= new Date(range.from)
    );
  };

  // ✅ Handle Razorpay Payment + Booking
  const handlePayment = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (isOverlapping(checkIn, checkOut)) {
      alert("❌ Selected dates are already booked. Please choose another range.");
      return;
    }

    setPaymentLoading(true);

    try {
      // 1️⃣ Create Razorpay Order
      const { data } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, {
        amount: Number(pg.price),
        currency: "INR",
      });

      // 2️⃣ Configure Razorpay
      const options = {
        key: "rzp_test_RXPoTXzZb44ief", // ⚠️ Replace with your key
        amount: data.amount,
        currency: data.currency,
        name: "local rent ",
        description: `${pg.propertyType} - ${pg.title || pg.name}`,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(`${BACKEND_URL}/api/payment/verify-payment`, response);

            if (verify.data.success) {
              const bookingRes = await axios.patch(
                `${BACKEND_URL}/api/pgdetails/${id}/book-range`,
                {
                  from: checkIn.toISOString(),
                  to: checkOut.toISOString(),
                  totalAmount: Number(pg.price),
                  userEmail: user?.email,
                  userName: user?.username,
                  location: String(pg.location),
                  deposit: (pg.deposit),
                },
                {
                  withCredentials: true,
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (bookingRes.status === 200) {
                setBookedRanges(bookingRes.data.bookedRanges);
                alert(
                  `✅ Payment Successful & Booking Confirmed!\n${checkIn.toDateString()} → ${checkOut.toDateString()}`
                );
                navigate("/");
              } else {
                alert("⚠️ Payment succeeded, but booking failed. Please contact support.");
              }
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Booking after payment error:", err);
            alert("⚠️ Payment successful but booking failed.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      // 5️⃣ Open Razorpay
      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment initialization failed.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading PG details...</div>;
  if (!pg) return <div className="text-center mt-20 text-red-600">PG not found ❌</div>;

  return (
    <div className="payment-card">
      <h2>{pg.title || pg.name}</h2>
      <p className="pg-type">{pg.propertyType}</p>
      <p className="pg-price">Price ₹{pg.price}</p>

      {/* ✅ Check-in / Check-out Inputs */}
      <div className="checkin-checkout-section">
        <input
          type="text"
          value={checkIn ? checkIn.toDateString() : ""}
          placeholder="Select Check-in"
          readOnly
          onClick={() => setOpenModal(true)}
        />
        <input
          type="text"
          value={checkOut ? checkOut.toDateString() : ""}
          placeholder="Select Check-out"
          readOnly
          onClick={() => setOpenModal(true)}
        />
      </div>

      {/* ✅ Payment Button */}
      <button
        onClick={handlePayment}
        className="payment-btn"
        disabled={paymentLoading || !checkIn || !checkOut}
      >
        {paymentLoading ? "Processing..." : `Pay ₹${pg.price}`}
      </button>

      <p className="secure-text">Secure payments powered by Razorpay 🔒</p>

      {/* ✅ Calendar Modal */}
      {openModal && (
        <div
          className="calendar-modal"
          onClick={(e) => {
            if (e.target.className === "calendar-modal") setOpenModal(false);
          }}
        >
          <div className="calendar-modal-content">
            <CalendarPage
              pgId={pg._id}
              checkIn={checkIn}
              checkOut={checkOut}
              propertyType={pg.propertyType}
              bookedRanges={bookedRanges}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
