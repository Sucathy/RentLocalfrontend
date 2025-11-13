// src/Components/AmenitiesSection.jsx
import { useState } from "react";
import "./AmenitiesSection.css";

const AmenitiesSection = ({ amenities = [], amenityIcons = {} }) => {
    const [showAmenityModal, setShowAmenityModal] = useState(false);

    return (
        <div className="amenity-section">
            <h3 className="amenity-offer">What this place offers</h3>
            <div className="amenity-box-button">
                {amenities.slice(0, 6).map((amenity, i) => (
                    <div className="amenities-container" key={i}>
                        {amenityIcons[amenity.name]}
                        <span className="amenity-tag">{amenity.name}</span>
                    </div>
                ))}

                {/* Always show More button */}
                <button
                    className="more-btn"
                    onClick={() => setShowAmenityModal(true)}
                >
                    {amenities.length > 6
                        ? `+${amenities.length - 6} More`
                        : "All Shown"}
                </button>
            </div>

            {/* ---------- MODAL ---------- */}
            {showAmenityModal && (
                <div
                    className="amenity-modal-overlay"
                    onClick={() => setShowAmenityModal(false)}
                >
                    <div
                        className="amenity-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowAmenityModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="modal-title">All Amenities</h3>
                        <div className="modal-amenities-grid">
                            {amenities.map((amenity, i) => (
                                <div className="amenities-container" key={i}>
                                    {amenityIcons[amenity.name]}
                                    <span className="amenity-tag">{amenity.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AmenitiesSection;
