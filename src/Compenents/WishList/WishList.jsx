import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishList.css";

const WISHLIST_API = `${process.env.REACT_APP_API_BASE}/api/wishlist`;

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist using HttpOnly cookie
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(WISHLIST_API, {
          withCredentials: true, // send cookie
        });

        setWishlist(res.data.wishlist || []);
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err.response?.data || err.message);
        setWishlist([]); // reset if unauthorized
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Remove from wishlist
  const handleRemove = async (pgId) => {
    try {
      await axios.delete(`${WISHLIST_API}/remove`, {
        data: { pgId },
        withCredentials: true,
      });

      setWishlist((prev) => prev.filter((item) => item.pgId._id !== pgId));
    } catch (err) {
      console.error("❌ Error removing from wishlist:", err.response?.data || err.message);
    }
  };

  const handleCardClick = (pgId) => navigate(`/details/${pgId}`);

  if (loading) return <p className="text-center p-4">Loading your wishlist...</p>;

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <h1 className="wishlist-header">You'r fav ❤️ </h1>
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold">Your Wishlist is empty!</h2>
          <p className="text-gray-600 mt-2">Like some PGs to see them here ❤️</p>
        </div>
      </div>
    );
  }
  const handleBack = () => {
    navigate("/"); // Back to home
  };


  return (


    <div className="wishlist-page">

      {/* Header */}
      <button className="back-btn" onClick={handleBack}>
        {/* <FaArrowLeft /> Back */} back
      </button>
      <h1 className="wishlist-header">You'r fav ❤️ one </h1>

      {/* Wishlist cards */}
      <div className="WishlistCards">
        {wishlist.map(({ _id, pgId }) => {
          if (!pgId) return null;

          const locationStr =
            pgId.location && typeof pgId.location === "object"
              ? `${pgId.location.city || ""}${pgId.location.state ? ", " + pgId.location.state : ""}`
              : pgId.location || "Location not available";

          const priceStr =
            pgId.price && typeof pgId.price === "object"
              ? pgId.price.weekday
              : pgId.price || "N/A";

          return (
            <div key={_id} className="wishlist-card">
              <div
                className="wishlist-card-image"
                onClick={() => handleCardClick(pgId._id)}
              >
                <img src={pgId.images?.[0] || ""} alt={pgId.name || "PG Image"} />
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(pgId._id);
                  }}
                >
                  ❤️
                </button>
              </div>

              <div
                className="wishlist-card-content"
                onClick={() => handleCardClick(pgId._id)}
              >
                <div className="wishlist-card-title">{pgId.name || "No Name"}</div>
                <div className="wishlist-card-location">{locationStr}</div>
                <div className="wishlist-card-footer">
                  <span className="wishlist-card-price">₹{priceStr}/mo</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
