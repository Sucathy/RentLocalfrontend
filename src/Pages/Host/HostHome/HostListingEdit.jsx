// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import EditableLocationMap from "./EditableLocationMap";
// import "./HostListingEdit.css";
// const API = `${process.env.REACT_APP_API_BASE}/api/hostuser`;


// const HostListingEdit = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         userId: "",
//         propertyType: "",
//         roomType: "",
//         pgType: "",
//         bhkType: "",
//         location: {
//             country: "",
//             state: "",
//             city: "",
//             street: "",
//             landmark: "",
//             locality: "",
//             pincode: "",
//         },
//         locationmap: {
//             latitude: "",
//             longitude: "",
//         },
//         details: {
//             guests: 0,
//             bedrooms: 0,
//             beds: 0,
//             bathrooms: 0,
//         },
//         price: {
//             monthly: 0,
//             serviceFee: 100, // Fixed ₹100
//         },
//         hostDetails: {
//             name: "",
//             contact: "",
//         },
//         title: "",
//         description: "",
//         images: [],
//     });

//     const [newImage, setNewImage] = useState("");

//     // ✅ Fetch listing data safely
//     useEffect(() => {
//         const fetchListing = async () => {
//             try {
//                 const res = await axios.get(`${API}/user/${id}`, { withCredentials: true });
//                 if (res.data.success && res.data.listing) {
//                     const listing = res.data.listing;

//                     // 🧠 Safely ensure nested objects exist (prevents undefined errors)
//                     setFormData({
//                         ...formData,
//                         ...listing,
//                         location: listing.location || {
//                             country: "",
//                             state: "",
//                             city: "",
//                             street: "",
//                             landmark: "",
//                             locality: "",
//                             pincode: "",
//                         },
//                         locationmap: listing.locationmap || {
//                             latitude: "",
//                             longitude: "",
//                         },
//                         details: listing.details || {
//                             guests: 0,
//                             bedrooms: 0,
//                             beds: 0,
//                             bathrooms: 0,
//                         },
//                         price: listing.price || {
//                             monthly: 0,
//                             serviceFee: 100,
//                         },
//                         hostDetails: listing.hostDetails || {
//                             name: "",
//                             contact: "",
//                         },
//                         images: listing.images || [],
//                     });
//                 }
//             } catch (err) {
//                 console.error("Error fetching listing:", err);
//                 alert(err.response?.data?.message || "Failed to fetch listing details");
//             }
//         };
//         fetchListing();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [id]);

//     // ✅ Handle change for top-level fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "propertyType") {
//             // Special logic for PG vs BHK
//             setFormData((prev) => ({
//                 ...prev,
//                 propertyType: value,
//                 pgType: value === "PG" ? prev.pgType : "",
//                 bhkType: value === "PG" ? "" : prev.bhkType,
//             }));
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     // ✅ Nested handler for objects
//     const handleNestedChange = (section, field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: { ...prev[section], [field]: value },
//         }));
//     };

//     // ✅ Image add/delete
//     const handleAddImage = () => {
//         if (newImage.trim()) {
//             setFormData((prev) => ({ ...prev, images: [...prev.images, newImage.trim()] }));
//             setNewImage("");
//         }
//     };

//     const handleDeleteImage = (index) => {
//         const updated = formData.images.filter((_, i) => i !== index);
//         setFormData((prev) => ({ ...prev, images: updated }));
//     };

//     // ✅ Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.put(`${API}/user/${id}`, formData, { withCredentials: true });
//             if (res.data.success) {
//                 alert("Listing updated successfully!");
//                 navigate("/hostes");
//             }
//         } catch (err) {
//             console.error("Update error:", err);
//             alert(err.response?.data?.message || "Failed to update listing");
//         }
//     };

//     return (
//         <div className="host-edit-container">
//             <div className="host-edit-card">
//                 <h2>Edit Your Listing</h2>

//                 <form onSubmit={handleSubmit} className="host-edit-form">
//                     {/* ✅ Property Type */}
//                     <div className="form-group">
//                         <label>Property Type</label>
//                         <select
//                             name="propertyType"
//                             value={formData.propertyType}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select Property Type</option>
//                             <option value="PG">PG</option>
//                             <option value="House">House</option>
//                             <option value="Flat">Flat</option>
//                             <option value="Apartment">Apartment</option>
//                             <option value="Guest House">Guest House</option>
//                             <option value="Farm">Farm</option>
//                         </select>
//                     </div>

//                     {/* ✅ PG Type only when PG */}
//                     {formData.propertyType === "PG" && (
//                         <div className="form-group">
//                             <label>PG Type</label>
//                             <input
//                                 name="pgType"
//                                 value={formData.pgType}
//                                 onChange={handleChange}
//                                 placeholder="Ex: Boys PG / Girls PG / Co-Living"
//                             />
//                         </div>
//                     )}

//                     {/* ✅ BHK Type only when not PG */}
//                     {formData.propertyType !== "PG" && formData.propertyType && (
//                         <div className="form-group">
//                             <label>BHK Type</label>
//                             <input
//                                 name="bhkType"
//                                 value={formData.bhkType}
//                                 onChange={handleChange}
//                                 placeholder="Ex: 1BHK / 2BHK / 3BHK"
//                             />
//                         </div>
//                     )}

//                     {/* ✅ Room Type */}
//                     <div className="form-group">
//                         <label>Room Type</label>
//                         <input
//                             name="roomType"
//                             value={formData.roomType}
//                             onChange={handleChange}
//                             placeholder="Ex: Single / Double / Shared"
//                         />
//                     </div>

//                     {/* ✅ Location Details */}
//                     <div className="nested-section">
//                         <h4>📍 Location Details</h4>
//                         <div className="nested-grid">
//                             {Object.entries(formData.location).map(([key, value]) => (
//                                 <div className="form-group" key={key}>
//                                     <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                                     <input
//                                         type="text"
//                                         value={value}
//                                         onChange={(e) => handleNestedChange("location", key, e.target.value)}
//                                         placeholder={`Enter ${key}`}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* ✅ Location Map */}
//                     {/* <div className="nested-section">
//                         <h4>🗺️ Location Map</h4>
//                         <div className="nested-grid">
//                             <div className="form-group">
//                                 <label>Latitude</label>
//                                 <input
//                                     type="number"
//                                     step="any"
//                                     value={formData.locationmap?.latitude || ""}
//                                     onChange={(e) =>
//                                         handleNestedChange("locationmap", "latitude", e.target.value)
//                                     }
//                                     placeholder="Enter latitude (e.g. 12.9716)"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Longitude</label>
//                                 <input
//                                     type="number"
//                                     step="any"
//                                     value={formData.locationmap?.longitude || ""}
//                                     onChange={(e) =>
//                                         handleNestedChange("locationmap", "longitude", e.target.value)
//                                     }
//                                     placeholder="Enter longitude (e.g. 77.5946)"
//                                 />
//                             </div>
//                         </div>
//                     </div> */}


//                     {/* ✅ Location Map */}
//                     {/* ✅ Location Map */}
//                     <div className="nested-section">
//                         <h4>🗺️ Location Map</h4>

//                         <EditableLocationMap
//                             coordinates={{
//                                 lat:
//                                     parseFloat(formData.locationmap?.latitude) ||
//                                     0,
//                                 lng:
//                                     parseFloat(formData.locationmap?.longitude) ||
//                                     0,
//                             }}
//                             onChange={(coords) =>
//                                 setFormData((prev) => ({
//                                     ...prev,
//                                     locationmap: {
//                                         latitude: parseFloat(coords.lat).toFixed(6),
//                                         longitude: parseFloat(coords.lng).toFixed(6),
//                                     },
//                                 }))
//                             }
//                         />

//                         {/* Display latitude & longitude in inputs for user confirmation */}
//                         <div className="nested-grid">
//                             <div className="form-group">
//                                 <label>Latitude</label>
//                                 <input
//                                     type="number"
//                                     step="any"
//                                     value={formData.locationmap.latitude || ""}
//                                     onChange={(e) =>
//                                         handleNestedChange(
//                                             "locationmap",
//                                             "latitude",
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Longitude</label>
//                                 <input
//                                     type="number"
//                                     step="any"
//                                     value={formData.locationmap.longitude || ""}
//                                     onChange={(e) =>
//                                         handleNestedChange(
//                                             "locationmap",
//                                             "longitude",
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     </div>




//                     {/* ✅ Room Details */}
//                     <div className="nested-section">
//                         <h4>🛏️ Room Details</h4>
//                         <div className="nested-grid">
//                             {Object.entries(formData.details).map(([key, value]) => (
//                                 <div className="form-group" key={key}>
//                                     <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                                     <input
//                                         type="number"
//                                         min="0"
//                                         value={value}
//                                         onChange={(e) => handleNestedChange("details", key, e.target.value)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* ✅ Pricing */}
//                     <div className="nested-section">
//                         <h4>💰 Pricing</h4>
//                         <div className="nested-grid">
//                             <div className="form-group">
//                                 <label>Monthly Price</label>
//                                 <input
//                                     type="number"
//                                     value={formData.price.monthly}
//                                     onChange={(e) => handleNestedChange("price", "monthly", e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Service Fee (Fixed)</label>
//                                 <input type="number" value={100} readOnly />
//                             </div>
//                         </div>
//                     </div>

//                     {/* ✅ Host Details */}
//                     <div className="nested-section">
//                         <h4>👤 Host Details</h4>
//                         <div className="nested-grid">
//                             <div className="form-group">
//                                 <label>Name</label>
//                                 <input
//                                     value={formData.hostDetails.name}
//                                     onChange={(e) => handleNestedChange("hostDetails", "name", e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Contact</label>
//                                 <input
//                                     value={formData.hostDetails.contact}
//                                     onChange={(e) => handleNestedChange("hostDetails", "contact", e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* ✅ Title & Description */}
//                     <div className="form-group">
//                         <label>Title</label>
//                         <input
//                             name="title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             placeholder="Add a catchy title"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Description</label>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows={3}
//                             placeholder="Write a short description about your property"
//                         />
//                     </div>

//                     {/* ✅ Images */}
//                     <div className="images-section">
//                         <h4>🖼️ Images</h4>
//                         <div className="image-preview-wrapper">
//                             {formData.images.map((img, index) => (
//                                 <div key={index} className="image-box">
//                                     <img
//                                         src={
//                                             img.startsWith("http")
//                                                 ? img
//                                                 : `${process.env.REACT_APP_API_BASE}/${img}`
//                                         }
//                                         alt={`Listing ${index}`}
//                                         className="preview-img"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleDeleteImage(index)}
//                                         className="delete-img-btn"
//                                     >
//                                         ✖
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="add-image">
//                             <input
//                                 type="text"
//                                 placeholder="Add new image URL"
//                                 value={newImage}
//                                 onChange={(e) => setNewImage(e.target.value)}
//                             />
//                             <button type="button" onClick={handleAddImage}>
//                                 Add Image
//                             </button>
//                         </div>
//                     </div>

//                     {/* ✅ Actions */}
//                     <div className="form-actions">
//                         <button type="submit" className="save-btn">
//                             Save Changes
//                         </button>
//                         <button
//                             type="button"
//                             className="cancel-btn"
//                             onClick={() => navigate("/hostes")}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default HostListingEdit;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditableLocationMap from "./EditableLocationMap";
import "./HostListingEdit.css";

const API = `${process.env.REACT_APP_API_BASE}/api/hostuser`;

const HostListingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        propertyType: "",
        roomType: "",
        pgType: "",
        bhkType: "",
        location: {
            country: "",
            state: "",
            city: "",
            street: "",
            landmark: "",
            locality: "",
            pincode: "",
        },
        locationmap: {
            latitude: "",
            longitude: "",
        },
        details: {
            guests: 0,
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
        },
        price: {
            monthly: 0,
            serviceFee: 100,
        },
        hostDetails: {
            name: "",
            contact: "",
        },
        title: "",
        description: "",
        images: [],
    });

    const [newImage, setNewImage] = useState("");

    // ✅ Fetch listing data safely
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await axios.get(`${API}/user/${id}`, { withCredentials: true });
                if (res.data.success && res.data.listing) {
                    const listing = res.data.listing;

                    setFormData((prev) => ({
                        ...prev,
                        ...listing,
                        location: listing.location || prev.location,
                        locationmap: listing.locationmap || prev.locationmap,
                        details: listing.details || prev.details,
                        price: listing.price || prev.price,
                        hostDetails: listing.hostDetails || prev.hostDetails,
                        images: listing.images || prev.images,
                    }));
                }
            } catch (err) {
                console.error("Error fetching listing:", err);
                alert(err.response?.data?.message || "Failed to fetch listing details");
            }
        };
        fetchListing();
    }, [id]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "propertyType") {
            setFormData((prev) => ({
                ...prev,
                propertyType: value,
                pgType: value === "PG" ? prev.pgType : "",
                bhkType: value === "PG" ? "" : prev.bhkType,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleAddImage = () => {
        if (newImage.trim()) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, newImage.trim()],
            }));
            setNewImage("");
        }
    };

    const handleDeleteImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${API}/user/${id}`, formData, {
                withCredentials: true,
            });
            if (res.data.success) {
                alert("Listing updated successfully!");
                navigate("/hostes");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert(err.response?.data?.message || "Failed to update listing");
        }
    };

    return (
        <div className="host-edit-container">
            <div className="host-edit-card">
                <h2>Edit Your Listing</h2>

                <form onSubmit={handleSubmit} className="host-edit-form">
                    {/* ✅ Property Type */}
                    <div className="form-group">
                        <label>Property Type</label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Property Type</option>
                            <option value="PG">PG</option>
                            <option value="House">House</option>
                            <option value="Flat">Flat</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Guest House">Guest House</option>
                            <option value="Farm">Farm</option>
                        </select>
                    </div>

                    {/* ✅ PG Type */}
                    {formData.propertyType === "PG" && (
                        <div className="form-group">
                            <label>PG Type</label>
                            <input
                                name="pgType"
                                value={formData.pgType}
                                onChange={handleChange}
                                placeholder="Ex: Boys PG / Girls PG / Co-Living"
                            />
                        </div>
                    )}

                    {/* ✅ BHK Type */}
                    {formData.propertyType !== "PG" && formData.propertyType && (
                        <div className="form-group">
                            <label>BHK Type</label>
                            <input
                                name="bhkType"
                                value={formData.bhkType}
                                onChange={handleChange}
                                placeholder="Ex: 1BHK / 2BHK / 3BHK"
                            />
                        </div>
                    )}

                    {/* ✅ Room Type */}
                    <div className="form-group">
                        <label>Room Type</label>
                        <input
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            placeholder="Ex: Single / Double / Shared"
                        />
                    </div>

                    {/* ✅ Location Details */}
                    <div className="nested-section">
                        <h4>📍 Location Details</h4>
                        <div className="nested-grid">
                            {Object.entries(formData.location).map(([key, value]) => (
                                <div className="form-group" key={key}>
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) =>
                                            handleNestedChange("location", key, e.target.value)
                                        }
                                        placeholder={`Enter ${key}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ✅ Location Map */}
                    <div className="nested-section">
                        <h4>🗺️ Location Map</h4>
                        <EditableLocationMap
                            coordinates={{
                                lat: parseFloat(formData.locationmap?.latitude) || 12.9716,
                                lng: parseFloat(formData.locationmap?.longitude) || 77.5946,
                            }}
                            onChange={(coords) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    locationmap: {
                                        latitude: parseFloat(coords.lat).toFixed(6),
                                        longitude: parseFloat(coords.lng).toFixed(6),
                                    },
                                }))
                            }
                        />

                        <div className="nested-grid">
                            <div className="form-group">
                                <label>Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.locationmap.latitude || ""}
                                    onChange={(e) =>
                                        handleNestedChange("locationmap", "latitude", e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.locationmap.longitude || ""}
                                    onChange={(e) =>
                                        handleNestedChange("locationmap", "longitude", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* ✅ Room Details */}
                    <div className="nested-section">
                        <h4>🛏️ Room Details</h4>
                        <div className="nested-grid">
                            {Object.entries(formData.details).map(([key, value]) => (
                                <div className="form-group" key={key}>
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={value}
                                        onChange={(e) =>
                                            handleNestedChange("details", key, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ✅ Pricing */}
                    <div className="nested-section">
                        <h4>💰 Pricing</h4>
                        <div className="nested-grid">
                            <div className="form-group">
                                <label>Monthly Price</label>
                                <input
                                    type="number"
                                    value={formData.price.monthly}
                                    onChange={(e) =>
                                        handleNestedChange("price", "monthly", e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Service Fee (Fixed)</label>
                                <input type="number" value={100} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* ✅ Host Details */}
                    <div className="nested-section">
                        <h4>👤 Host Details</h4>
                        <div className="nested-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    value={formData.hostDetails.name}
                                    onChange={(e) =>
                                        handleNestedChange("hostDetails", "name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact</label>
                                <input
                                    value={formData.hostDetails.contact}
                                    onChange={(e) =>
                                        handleNestedChange("hostDetails", "contact", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* ✅ Title & Description */}
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Add a catchy title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Write a short description about your property"
                        />
                    </div>

                    {/* ✅ Images */}
                    <div className="images-section">
                        <h4>🖼️ Images</h4>
                        <div className="image-preview-wrapper">
                            {formData.images.map((img, index) => (
                                <div key={index} className="image-box">
                                    <img
                                        src={
                                            img.startsWith("http")
                                                ? img
                                                : `${process.env.REACT_APP_API_BASE}/${img}`
                                        }
                                        alt={`Listing ${index}`}
                                        className="preview-img"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        className="delete-img-btn"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="add-image">
                            <input
                                type="text"
                                placeholder="Add new image URL"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                            />
                            <button type="button" onClick={handleAddImage}>
                                Add Image
                            </button>
                        </div>
                    </div>

                    {/* ✅ Actions */}
                    <div className="form-actions">
                        <button type="submit" className="save-btn">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/hostes")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HostListingEdit;
