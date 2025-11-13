import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./PgCardList.css";

const PGCardList = ({ pgList, wishlist, toggleWishlist, propertyType }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => navigate(`/details/${id}`);

    // ✅ Filter case-insensitive
    const filteredList = pgList.filter(
        (pg) => pg.propertyType?.toLowerCase() === propertyType?.toLowerCase()
    );

    if (!filteredList || filteredList.length === 0) {
        return <p className="no-data-message">
            No {propertyType}s available in this location. We will be adding more soon. <br />
            If you want to host in this location, please fill out the host form in the
            “Become a Host” section. <br />
            If you have any other queries, please contact us.
        </p>


    }

    return (
        <div className="PGCardList">
            {filteredList.map((pg) => {
                const isLiked = wishlist.includes(pg._id);

                const locationStr =
                    typeof pg.location === "object"
                        ? `${pg.location.city || ""}${pg.location.state ? ", " + pg.location.state : ""}`
                        : pg.location || "Location not available";

                const priceStr =
                    typeof pg.price === "object" ? pg.price.weekday : pg.price || "N/A";

                return (
                    <div key={pg._id} className="pg-card">
                        <div className="pg-card-image" onClick={() => handleCardClick(pg._id)}>
                            <img src={pg.images?.[0] || ""} alt={pg.name || "PG Image"} />
                            <div
                                className="heart-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(pg._id);
                                }}
                            >
                                {isLiked ? <AiFillHeart size={26} color="red" /> : <AiOutlineHeart size={26} color="white" />}
                            </div>
                        </div>

                        <div className="pg-card-content" onClick={() => handleCardClick(pg._id)}>
                            <div className="pg-card-title">{pg.title || "No Name"}</div>
                            <div className="pg-card-location">{locationStr}</div>
                            <div className="pg-card-footer">
                                <span className="pg-card-price">₹{priceStr}/m</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PGCardList;
