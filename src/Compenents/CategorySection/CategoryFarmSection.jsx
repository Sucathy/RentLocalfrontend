import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Fotter from "../Home/Fotter/Fotter";
import Navbar from "../Home/Navbar";
import CategoryTemplate from "./CategoryTemplate";
// reuse same CSS

export default function FarmPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleBack = () => {
        navigate("/"); // Go back to home
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="search-page">
                {/* 🔙 Back Button */}
                <button className="back-btn" onClick={handleBack}>
                    {/* <FaArrowLeft /> Back */} back
                </button>

                {/* 🌾 Page Title */}
                <h2>Find the Best Farm Houses</h2>

                {/* 🔍 Search Bar */}
                <div className="search-bar-wrapper">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Farm Houses..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
            {/* 📋 Farm Results */}
            <div className="search-results">
                <CategoryTemplate propertyType="Farm" searchQuery={searchQuery} />
            </div>
            <Fotter />
        </div>
    );
}
