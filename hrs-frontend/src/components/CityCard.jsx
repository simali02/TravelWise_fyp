import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/CityCardStyles.css";
import PropTypes from "prop-types";

const CityCard = ({ imageSrc, cityName, linkTo }) => {
  return (
    <Link to={linkTo} className="city-card-anchor">

    <div className="city-card">
      <div className="featured-img">
        <img src={imageSrc} alt={cityName} className="city-card-image" />
      </div>
      <div className="city-card-footer">
        <p className="city-name">{cityName}</p>
      </div>
    </div>
    </Link>

  );
};

CityCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default CityCard;
