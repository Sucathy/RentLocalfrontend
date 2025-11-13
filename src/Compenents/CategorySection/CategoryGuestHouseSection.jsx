import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Fotter from "../Home/Fotter/Fotter";
import CategoryTemplate from "./CategoryTemplate";
// import "./SearchPage.css"; // Reuse the same style
import Navbar from "../Home/Navbar";
export default function GuestHousePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleBack = () => {
        navigate("/"); // Back to home
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
                    {/* <FaArrowLeft /> */} back
                </button>

                {/* 🏠 Page Title */}
                <h2>Find the Best Guest Houses</h2>

                {/* 🔍 Search Bar */}
                <div className="search-bar-wrapper">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Guest Houses..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
            {/* 📋 Guest House Results */}
            <div className="search-results">
                <CategoryTemplate propertyType="Guest House" searchQuery={searchQuery} />
            </div>
            <div>
                <Fotter />
            </div>
        </div>
    );
}
