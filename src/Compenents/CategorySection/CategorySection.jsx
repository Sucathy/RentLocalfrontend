import { useNavigate } from "react-router-dom";
import "./CategorySection.css";


const CategorySection = () => {
    const navigate = useNavigate();

    const categories = [
        { name: "All", path: "/" },
        { name: "Pg", path: "/pg" },
        { name: "House", path: "/house" },
        { name: "Flat", path: "/flat-apartment" },
        { name: "Guest House", path: "/guest-house" },
        { name: "Farm", path: "/farm" },
    ];

    return (
        <div className="category-section">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    className="category-btn"
                    onClick={() => navigate(cat.path)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default CategorySection;
