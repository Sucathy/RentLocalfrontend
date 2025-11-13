// import axios from "axios";
// import { useEffect, useState } from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import CategorySection from "../CategorySection/CategorySection";
// import "./HomeCard.css";

// const API = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;
// const WISHLIST_API = `${process.env.REACT_APP_API_BASE}/api/wishlist`;

// const HomeCard = () => {
//   const navigate = useNavigate();
//   const [pgList, setPgList] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [category, setCategory] = useState("All");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resPGs = await axios.get(API, { withCredentials: true });
//         setPgList(resPGs.data);

//         const resWish = await axios.get(WISHLIST_API, { withCredentials: true });
//         const likedPgIds = resWish.data.wishlist.map((w) => w.pgId._id);
//         setWishlist(likedPgIds);
//       } catch (err) {
//         console.error("Fetch data error:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleWishlist = async (pgId) => {
//     try {
//       if (!pgId) return;

//       if (wishlist.includes(pgId)) {
//         await axios.delete(`${WISHLIST_API}/remove`, { data: { pgId }, withCredentials: true });
//         setWishlist((prev) => prev.filter((id) => id !== pgId));
//       } else {
//         const res = await axios.post(`${WISHLIST_API}/add`, { pgId }, { withCredentials: true });
//         const newId = res.data.wishlistItem?.pgId?._id || pgId;
//         setWishlist((prev) => [...prev, newId]);
//       }
//     } catch (err) {
//       console.error("Toggle wishlist error:", err.response?.data || err.message);
//     }
//   };

//   const handleCardClick = (id) => navigate(`/details/${id}`);

//   if (loading) return <p className="text-center p-4">Loading PGs...</p>;

//   const filteredPGs =
//     category === "All"
//       ? pgList
//       : pgList.filter((pg) => pg.pgType === category || pg.propertyType === category);

//   const displayPGs = filteredPGs.slice(0, 25);

//   return (
//     <div>
//       {/* ✅ Category Section */}
//       <CategorySection category={category} setCategory={setCategory} />

//       <div className="Homecards">
//         {displayPGs.map((pg) => {
//           const isLiked = wishlist.includes(pg._id);

//           const locationStr =
//             pg.location && typeof pg.location === "object"
//               ? `${pg.location.city || ""}${pg.location.state ? ", " + pg.location.state : ""}`
//               : pg.location || "Location not available";

//           const priceStr =
//             pg.price && typeof pg.price === "object" ? pg.price.weekday : pg.price || "N/A";

//           return (
//             <div key={pg._id} className="home-card">
//               <div className="home-card-image" onClick={() => handleCardClick(pg._id)}>
//                 <img src={pg.images?.[0] || ""} alt={pg.name || "PG Image"} />
//                 <div
//                   className="heart-icon"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(pg._id);
//                   }}
//                 >
//                   {isLiked ? (
//                     <AiFillHeart size={28} color="red" />
//                   ) : (
//                     <AiOutlineHeart size={28} color="white" />
//                   )}
//                 </div>
//               </div>

//               <div className="home-card-content" onClick={() => handleCardClick(pg._id)}>
//                 <div className="home-card-title">{pg.name || "No Name"}</div>
//                 <div className="home-card-location">{locationStr}</div>
//                 <div className="home-card-footer">
//                   <span className="home-card-price">₹{priceStr}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HomeCard;




import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CategorySection from "../CategorySection/CategorySection";
import Searchpage from "../Home/Searchbar/Searchpage";
import "./HomeCard.css";

const API = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;
const WISHLIST_API = `${process.env.REACT_APP_API_BASE}/api/wishlist`;

const HomeCard = () => {
  const navigate = useNavigate();
  const [pgList, setPgList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(25);

  // Debounce search input to avoid filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch PGs and wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPGs = await axios.get(API, { withCredentials: true });
        setPgList(resPGs.data || []);

        const resWish = await axios.get(WISHLIST_API, { withCredentials: true });
        const likedPgIds = resWish.data.wishlist.map((w) => w.pgId._id);
        setWishlist(likedPgIds);
      } catch (err) {
        console.error("Fetch data error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle wishlist
  const toggleWishlist = async (pgId) => {
    try {
      if (!pgId) return;
      if (wishlist.includes(pgId)) {
        await axios.delete(`${WISHLIST_API}/remove`, { data: { pgId }, withCredentials: true });
        setWishlist((prev) => prev.filter((id) => id !== pgId));
      } else {
        const res = await axios.post(`${WISHLIST_API}/add`, { pgId }, { withCredentials: true });
        const newId = res.data.wishlistItem?.pgId?._id || pgId;
        setWishlist((prev) => [...prev, newId]);
      }
    } catch (err) {
      console.error("Toggle wishlist error:", err.response?.data || err.message);
    }
  };

  const filteredPGs = useMemo(() => {
    return pgList.filter((pg) => {
      const matchesCategory =
        category === "All" || pg.pgType === category || pg.propertyType === category;

      let locationStr = "";
      if (typeof pg.location === "string") locationStr = pg.location.toLowerCase();
      else if (typeof pg.location === "object")
        locationStr = `${pg.location.city || ""} ${pg.location.state || ""}`.toLowerCase();

      const matchesSearch =
        !debouncedQuery ||
        pg.name?.toLowerCase().includes(debouncedQuery) ||
        locationStr.includes(debouncedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [pgList, category, debouncedQuery]);

  const visiblePGs = filteredPGs.slice(0, visibleCount);
  const loadMore = () => setVisibleCount((prev) => prev + 35);

  const handleCardClick = (id) => navigate(`/details/${id}`);

  if (loading) return <p className="text-center p-4">Loading PGs...</p>;

  return (
    <div>
      {/* Search Input */}
      <Searchpage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Category Section */}
      <CategorySection category={category} setCategory={setCategory} />

      {/* PG Cards */}
      <div className="Homecards">
        {visiblePGs.length === 0 ? (
          <p className="no-data-message">
            No available in this location. We will be adding more soon. <br />
            If you want to host in this location, please fill out the host form in the
            “Become a Host” section. <br />
            If you have any other queries, please contact us.
          </p>
        ) : (
          visiblePGs.map((pg) => {
            const isLiked = wishlist.includes(pg._id);
            const locationStr =
              typeof pg.location === "string"
                ? pg.location
                : `${pg.location?.city || ""}${pg.location?.state ? ", " + pg.location.state : ""}`;
            const priceStr =
              pg.price && typeof pg.price === "object" ? pg.price.weekday : pg.price || "N/A";

            return (
              <div key={pg._id} className="home-card">
                <div className="home-card-image" onClick={() => handleCardClick(pg._id)}>
                  <img src={pg.images?.[0] || "/fallback.jpg"} alt={pg.name || "PG Image"} />
                  <div
                    className="heart-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(pg._id);
                    }}
                  >
                    {isLiked ? (
                      <AiFillHeart size={28} color="red" />
                    ) : (
                      <AiOutlineHeart size={28} color="white" />
                    )}
                  </div>
                </div>

                <div className="home-card-content" onClick={() => handleCardClick(pg._id)}>
                  <div className="home-card-title">{pg.title || "No Name"}</div>
                  <div className="home-card-location">{locationStr}</div>
                  <div className="home-card-footer">
                    <span className="home-card-price">₹{priceStr}/m</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredPGs.length && (
        <div className="text-center mt-4">
          <button className="load-more-btn" onClick={loadMore}>
            Load More...!
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
