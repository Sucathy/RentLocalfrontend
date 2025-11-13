import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import PGCardList from "../CategorySection/PgCardList";

const API = `${process.env.REACT_APP_API_BASE}/api/pgdetails`;
const WISHLIST_API = `${process.env.REACT_APP_API_BASE}/api/wishlist`;

const CategoryTemplate = ({ propertyType, searchQuery = "" }) => {
    const [pgList, setPgList] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ Fetch PGs filtered by propertyType
                const resPGs = await axios.get(`${API}?propertyType=${propertyType}`, {
                    withCredentials: true,
                });
                setPgList(resPGs.data || []);

                // ✅ Fetch Wishlist
                const resWish = await axios.get(WISHLIST_API, { withCredentials: true });
                const likedPgIds = resWish.data.wishlist.map((w) => w.pgId._id);
                setWishlist(likedPgIds);
            } catch (err) {
                console.error("Fetch error:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [propertyType]);

    // ✅ Filter PGs based on search query (case-insensitive)
    const filteredPgList = useMemo(() => {
        if (!searchQuery.trim()) return pgList;
        return pgList.filter(pg =>
            pg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pg.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pgList, searchQuery]);

    const toggleWishlist = async (pgId) => {
        try {
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

    if (loading) return <p className="text-center p-4">Loading {propertyType}s...</p>;

    return (
        <div>
            <h2 className="category-title">{propertyType}</h2>
            <PGCardList
                pgList={filteredPgList}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                propertyType={propertyType}
            />
        </div>
    );
};

export default CategoryTemplate;
