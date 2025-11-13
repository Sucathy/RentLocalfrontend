
// const HostBookingStatus = () => {
//     const bookings = [
//         {
//             id: 1,
//             guestName: "Ravi Kumar",
//             listing: "Cozy PG near MG Road",
//             date: "2025-11-10",
//             status: "Pending",
//         },
//         {
//             id: 2,
//             guestName: "Anita Singh",
//             listing: "Luxury Stay in Koramangala",
//             date: "2025-11-12",
//             status: "Accepted",
//         },
//     ];

//     return (
//         <div className="booking-status">
//             <h2>Booking Status</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Guest</th>
//                         <th>Listing</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((b) => (
//                         <tr key={b.id}>
//                             <td>{b.guestName}</td>
//                             <td>{b.listing}</td>
//                             <td>{b.date}</td>
//                             <td
//                                 className={
//                                     b.status === "Accepted"
//                                         ? "status-accepted"
//                                         : b.status === "Pending"
//                                             ? "status-pending"
//                                             : "status-rejected"
//                                 }
//                             >
//                                 {b.status}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default HostBookingStatus;




const HostBookingStatus = () => {
    return (
        <div className="booking-status">
            <h2>Booking Status</h2>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#777" }}>
                🚧 Coming Soon 🚧
            </p>
        </div>
    );
};

export default HostBookingStatus;
