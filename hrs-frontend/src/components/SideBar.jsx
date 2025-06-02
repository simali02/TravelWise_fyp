import React, { useEffect, useState } from "react";
import "../assets/css/SideBarStyles.css";
import generateUniqueKey from "../features/uniqueKey";

const Sidebar = ({ setFilters, filters, setQuery, items }) => {
  const cities = [
    { name: "Karachi", type: "karachi" },
    { name: "Lahore", type: "lahore" },
    { name: "Islamabad", type: "islamabad" },
  ];
  const place_type = [
    { name: "Hotels", type: "hotel" },
    { name: "Attractions", type: "attraction" },
  ];
  const amenities = [
    "Wifi",
    "Laundry Service",
    "Air Conditioning",
    "Restaurant",
    "Parking",
    "Room Service",
    "Fitness Center",
    "Free Breakfast",
    "Swimming Pool",
    "Wheelchair Access",
  ];

  const hotelSubCategories = [
    "Hotel",
    "Bed and Breakfast",
    "Specialty Lodging",
  ];

  const attractionSubCategories = [
    "Museums",
    "Tours",
    "Nature & Parks",
    "Sights & Landmarks",
    "Food & Drink",
    "Water & Amusement Parks",
    "Spas & Wellness",
    "Shopping",
    "Fun & Games",
  ];
  const [subcategories, setSubcategories] = useState(
    filters?.place_type === "hotel"
      ? hotelSubCategories
      : attractionSubCategories
  );

  const [sortByTypes, setSortByTypes] = useState([
    { name: "Max to Min Number of Reviews", type: "reviews" },
    { name: "Hight to Low Rating", type: "rating" },
    { name: "AI Recommendations (Most Relevant)", type: "recommendations" },
  ]);

  // const ratings = [5, 4, 3, 2, 1];
  // const handleRatingChange = (rating) => {
  //   if (filters.rating === rating){
  //     setSortByTypes(["reviews", "recommendations"])
  //     setFilters({  ...filters,rating: '', sort_by: 'recommendations', });
  //   }
  //   else{
  //     setSortByTypes(["rating", "reviews", "recommendations"])
  //     setFilters({  rating: rating, sort_by: 'rating' });

  //   }

  // };

  const handleCityChange = (city) => {
    setFilters({ ...filters, city: filters.city === city ? "" : city });
  };

  const handleSubcategoryChange = (subcategories) => {
    setFilters({ ...filters, subcategories: subcategories === filters.subcategories ? "" : subcategories });
  };

  const handlePlaceType = (place_type) => {
    setFilters({ ...filters, place_type:  filters.place_type === place_type ? "" : place_type, amenities: place_type === "attraction" ? "" : filters.amenities });
  };
  const handleSortOptionChange = (item) => {
    setFilters({ ...filters, sort_by: item });
  };

  const handleAmenitiesChange = (item) => {
    const currentAmenities = [...(filters?.amenities || [])];

    const index = currentAmenities.findIndex((amenity) => amenity === item);

    if (index !== -1) {
      currentAmenities.splice(index, 1);
    } else {
      currentAmenities.push(item);
    }

    setFilters({ ...filters, amenities: currentAmenities });
  };

  useEffect(() => {
    setSubcategories(
      filters?.place_type === "hotel"
        ? hotelSubCategories
        : attractionSubCategories
    );
  }, [filters]);
  return (
    <div className="sidebar">
      <h3>Filters</h3>

      {/* Sorting Options */}
      <div className="filter-group">
        <h4>Sort By</h4>
        <select
          disabled={items.isFetching}
          value={filters?.sort_by}
          onChange={(item) => handleSortOptionChange(item.target.value)}
        >
          {sortByTypes.map((e, i) => (
            <option
              value={e["type"]}
              key={generateUniqueKey(
                `side-bar-filter-sort-by-${e["type"]}-${i}`
              )}
            >
              {e["name"]}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h4>Cities</h4>
        <div className="rating-buttons">
          {cities.map((c, i) => (
            <button
              disabled={items?.isFetching}
              key={generateUniqueKey("side-bar-filter-city" + c["type"] + i)}
              className={`rating-button ${
                c["type"] === filters?.city ? "active" : ""
              }`}
              onClick={() => {
                setFilters({ ...filters, city: c });
                handleCityChange(c["type"]);
              }}
            >
              {c["name"]}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h4>Category</h4>
        <div className="rating-buttons">
          {place_type.map((item, i) => (
            <button
              disabled={items?.isFetching}
              key={generateUniqueKey(
                "side-bar-filter-place-type" + item["type"] + i
              )}
              className={`rating-button ${
                item["type"] === filters.place_type ? "active" : ""
              }`}
              onClick={() => {
                handlePlaceType(item["type"]);
              }}
            >
              {item["name"]}
            </button>
          ))}
        </div>
      </div>
      {filters?.sort_by === "recommendations" ? (
        <>
          {filters?.place_type === "hotel" ? (
            <div className="filter-group">
              <h4>Amenities</h4>
              <div className="rating-buttons">
                {amenities.map((item, i) => (
                  <button
                    disabled={items?.isFetching}
                    key={generateUniqueKey(
                      "side-bar-filter-amenities" + item + i
                    )}
                    className={`rating-button ${
                      filters?.amenities?.includes(item) ? "active" : ""
                    }`}
                    onClick={() => {
                      handleAmenitiesChange(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="filter-group">
            <h4>Subcategoies</h4>
            <div className="rating-buttons">
              {subcategories.map((item, i) => (
                <button
                  disabled={items?.isFetching}
                  key={generateUniqueKey("side-bar-subcategories" + item + i)}
                  className={`rating-button ${
                    filters?.subcategories?.includes(item) ? "active" : ""
                  }`}
                  onClick={() => {
                    handleSubcategoryChange(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
