import axios from "axios";
import { useEffect, useState } from "react";
import "./HeroSection.css";

const API = `${process.env.REACT_APP_API_BASE}/api/hero`; // Backend API regeruguygtrgtrfrefrety

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // ✅ Fetch hero images from backend (public)
    const fetchImages = async () => {
      try {
        const res = await axios.get(API);
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching hero images:", err);
      }
    };
    fetchImages();
  }, []);

  // ✅ Auto-slide;
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-section single-image">
      <h2>New Arrivals</h2>
      <p>Discover the latest additions to our collection.</p>
      <div className="slide-container">
        {images.length > 0 && (
          <img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={`Slide ${currentIndex}`}
            className="slide-image"
            draggable={false}
          />
        )}
      </div>

      <div className="hero-dots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`hero-dot ${currentIndex === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
