// import axios from "axios";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./CalendarPage.css";

// const BACKEND_URL = "http://localhost:5000";

// const CalendarPage = ({ pgId }) => {
//   const [bookedRanges, setBookedRanges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [bookingLoading, setBookingLoading] = useState(false);

//   // ✅ Fetch booked ranges
//   useEffect(() => {
//     const fetchBookedRanges = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/pgdetails/${pgId}/calendar`);
//         const ranges = res.data.map(r => ({
//           from: new Date(r.from),
//           to: new Date(r.to),
//         }));
//         setBookedRanges(ranges);
//       } catch (err) {
//         console.error("Error fetching booked ranges:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookedRanges();
//   }, [pgId]);

//   // ✅ Check if date already booked
//   const isBooked = (date) =>
//     bookedRanges.some(range => date >= range.from && date <= range.to);

//   // ✅ Handle calendar click
//   const handleDateClick = (date) => {
//     if (checkIn && !checkOut && date.getTime() === checkIn.getTime()) {
//       setCheckIn(null);
//       setCheckOut(null);
//       return;
//     }

//     if (!checkIn) {
//       if (isBooked(date)) return alert("This date is already booked.");
//       setCheckIn(date);
//       return;
//     }

//     if (!checkOut) {
//       if (date <= checkIn) return alert("Check-out must be after check-in.");

//       // check conflicts
//       for (let d = new Date(checkIn); d <= date; d.setDate(d.getDate() + 1)) {
//         if (isBooked(new Date(d))) {
//           alert("Some dates in this range are already booked.");
//           return;
//         }
//       }

//       setCheckOut(date);
//       return;
//     }

//     setCheckIn(date);
//     setCheckOut(null);
//   };

//   // ✅ Handle booking (only from/to)
//   const handleBookDates = async () => {
//     if (!checkIn || !checkOut)
//       return alert("Please select both check-in and check-out dates.");

//     setBookingLoading(true);
//     try {
//       const isoFrom = checkIn.toISOString().split("T")[0];
//       const isoTo = checkOut.toISOString().split("T")[0];

//       await axios.patch(`${BACKEND_URL}/api/pgdetails/${pgId}/book-range`, {
//         from: isoFrom,
//         to: isoTo,
//       });

//       alert(`✅ Booking successful from ${isoFrom} to ${isoTo}!`);
//       setBookedRanges(prev => [...prev, { from: checkIn, to: checkOut }]);
//       setCheckIn(null);
//       setCheckOut(null);
//     } catch (err) {
//       console.error("Booking failed:", err);
//       alert(`❌ Booking failed: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const getTileClass = ({ date, view }) => {
//     if (view !== "month") return "";
//     if (isBooked(date)) return "booked-date";
//     if (checkIn && checkOut && date >= checkIn && date <= checkOut) return "selected-range";
//     if (checkIn && date.getTime() === checkIn.getTime()) return "checkin-date";
//     if (checkOut && date.getTime() === checkOut.getTime()) return "checkout-date";
//     return "available-date";
//   };

//   if (loading) return <p>Loading calendar...</p>;

//   const now = new Date();

//   return (
//     <div className="calendar-page-container">
//       <h2>📅 Availability Calendar</h2>

//       <Calendar
//         onClickDay={handleDateClick}
//         tileClassName={getTileClass}
//         minDate={now}
//         maxDate={new Date(now.getFullYear(), now.getMonth() + 12, now.getDate())}
//       />

//       {checkIn && <p>Check-in: {checkIn.toDateString()}</p>}
//       {checkOut && <p>Check-out: {checkOut.toDateString()}</p>}

//       {checkIn && checkOut && (
//         <button
//           className="book-dates-btn"
//           onClick={handleBookDates}
//           disabled={bookingLoading}
//         >
//           {bookingLoading ? "Booking..." : "Book Dates"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default CalendarPage;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./CalendarPage.css";

// const BACKEND_URL = "http://localhost:5000";

// const CalendarPage = ({ pgId, propertyType = "" }) => {
//   const [bookedRanges, setBookedRanges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [bookingLoading, setBookingLoading] = useState(false);

//   // ✅ Fetch booked ranges
//   useEffect(() => {
//     const fetchBookedRanges = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/pgdetails/${pgId}/calendar`);
//         const ranges = res.data.map((r) => ({
//           from: new Date(r.from),
//           to: new Date(r.to),
//         }));
//         setBookedRanges(ranges);
//       } catch (err) {
//         console.error("Error fetching booked ranges:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookedRanges();
//   }, [pgId]);

//   // ✅ Check if a date is already booked
//   const isBooked = (date) =>
//     bookedRanges.some((range) => date >= range.from && date <= range.to);

//   // ✅ Handle date click
//   const handleDateClick = (date) => {
//     // Reset selection if same date clicked again
//     if (checkIn && !checkOut && date.getTime() === checkIn.getTime()) {
//       setCheckIn(null);
//       setCheckOut(null);
//       return;
//     }

//     // First click → select check-in
//     if (!checkIn) {
//       if (isBooked(date)) return alert("This date is already booked.");
//       setCheckIn(date);
//       return;
//     }

//     // Second click → select check-out
//     if (!checkOut) {
//       if (date <= checkIn) return alert("Check-out must be after check-in.");

//       // ✅ If PG type is "pgs", require minimum 30 days
//       if (propertyType === "Pg") {
//         const diffDays = Math.ceil((date - checkIn) / (1000 * 60 * 60 * 24));
//         if (diffDays < 30) {
//           alert("For PGs, you must book at least 1 month (30 days).");
//           return;
//         }
//       }

//       // Check if any date in range is already booked
//       for (let d = new Date(checkIn); d <= date; d.setDate(d.getDate() + 1)) {
//         if (isBooked(new Date(d))) {
//           alert("Some dates in this range are already booked.");
//           return;
//         }
//       }

//       setCheckOut(date);
//       return;
//     }

//     // Reset if third click
//     setCheckIn(date);
//     setCheckOut(null);
//   };

//   // ✅ Handle booking (only from/to)
//   const handleBookDates = async () => {
//     if (!checkIn || !checkOut)
//       return alert("Please select both check-in and check-out dates.");

//     setBookingLoading(true);
//     try {
//       const isoFrom = checkIn.toISOString().split("T")[0];
//       const isoTo = checkOut.toISOString().split("T")[0];

//       await axios.patch(`${BACKEND_URL}/api/pgdetails/${pgId}/book-range`, {
//         from: isoFrom,
//         to: isoTo,
//       });

//       alert(`✅ Booking successful from ${isoFrom} to ${isoTo}!`);
//       setBookedRanges((prev) => [...prev, { from: checkIn, to: checkOut }]);
//       setCheckIn(null);
//       setCheckOut(null);
//     } catch (err) {
//       console.error("Booking failed:", err);
//       alert(`❌ Booking failed: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // ✅ Calendar tile styling
//   const getTileClass = ({ date, view }) => {
//     if (view !== "month") return "";
//     if (isBooked(date)) return "booked-date";
//     if (checkIn && checkOut && date >= checkIn && date <= checkOut)
//       return "selected-range";
//     if (checkIn && date.getTime() === checkIn.getTime()) return "checkin-date";
//     if (checkOut && date.getTime() === checkOut.getTime())
//       return "checkout-date";
//     return "available-date";
//   };

//   if (loading) return <p>Loading calendar...</p>;

//   const now = new Date();

//   return (
//     <div className="calendar-page-container">
//       <h2>📅 Availability Calendar</h2>

//       <Calendar
//         onClickDay={handleDateClick}
//         tileClassName={getTileClass}
//         minDate={now}
//         maxDate={new Date(now.getFullYear(), now.getMonth() + 12, now.getDate())}
//       />

//       {checkIn && <p>Check-in: {checkIn.toDateString()}</p>}
//       {checkOut && <p>Check-out: {checkOut.toDateString()}</p>}

//       {checkIn && checkOut && (
//         <button
//           className="book-dates-btn"
//           onClick={handleBookDates}
//           disabled={bookingLoading}
//         >
//           {bookingLoading ? "Booking..." : "Book Dates"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default CalendarPage;




import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";

const BACKEND_URL = "http://localhost:5000";

const CalendarPage = ({ pgId, propertyType = "", checkIn, checkOut, onDateSelect }) => {
  const [bookedRanges, setBookedRanges] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch booked ranges from backend
  useEffect(() => {
    const fetchBookedRanges = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/pgdetails/${pgId}/calendar`);
        const ranges = res.data.map((r) => ({
          from: new Date(r.from),
          to: new Date(r.to),
        }));
        setBookedRanges(ranges);
      } catch (err) {
        console.error("Error fetching booked ranges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedRanges();
  }, [pgId]);

  if (loading) return <p>Loading calendar...</p>;

  // ✅ Check if a date is already booked
  const isBooked = (date) =>
    bookedRanges.some((range) => date >= range.from && date <= range.to);

  // ✅ Handle date selection
  const handleDateClick = (date) => {
    // First click → select check-in
    if (!checkIn) {
      if (isBooked(date)) return alert("This date is already booked.");
      onDateSelect(date, null);
      return;
    }

    // Second click → select check-out
    if (!checkOut) {
      if (date <= checkIn) return alert("Check-out must be after check-in.");

      // Minimum 30 days for PGs
      if (propertyType === "Pg") {
        const diffDays = Math.ceil((date - checkIn) / (1000 * 60 * 60 * 24));
        if (diffDays < 30) return alert("For PGs, booking must be at least 30 days.");
      }

      // Check for overlap
      for (let d = new Date(checkIn); d <= date; d.setDate(d.getDate() + 1)) {
        if (isBooked(new Date(d))) return alert("Some dates in this range are already booked.");
      }

      onDateSelect(checkIn, date);
      return;
    }

    // Third click → reset
    onDateSelect(date, null);
  };

  // ✅ Calendar tile styling
  const getTileClass = ({ date, view }) => {
    if (view !== "month") return "";
    if (isBooked(date)) return "booked-date";
    if (checkIn && checkOut && date >= checkIn && date <= checkOut) return "selected-range";
    if (checkIn && date.getTime() === checkIn.getTime()) return "checkin-date";
    if (checkOut && date.getTime() === checkOut.getTime()) return "checkout-date";
    return "available-date";
  };

  const now = new Date();

  return (
    <div className="calendar-page-container">
      <h2>📅 Availability Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={getTileClass}
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth() + 12, now.getDate())}
      />

      {checkIn && <p>Check-in: {checkIn.toDateString()}</p>}
      {checkOut && <p>Check-out: {checkOut.toDateString()}</p>}
    </div>
  );
};

export default CalendarPage;
