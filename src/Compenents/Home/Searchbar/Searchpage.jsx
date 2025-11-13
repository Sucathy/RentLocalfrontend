import { FaSearch } from "react-icons/fa";
import "./Searchpage.css";

const Searchpage = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-page">
      <h2>Find Your Stay</h2>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search near youre location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button">  <FaSearch /></button>
        </div>
      </div>
    </div>
  );
};

export default Searchpage;
