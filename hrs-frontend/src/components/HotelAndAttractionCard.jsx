import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/HotelAndAttractionCardStyles.css";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { PiMountainsDuotone } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";

const Card = ({
  imageSrc,
  productTitle,
  number_of_reviews,
  rating,
  linkTo,
  subcategories,
  place_type,
  ranking,
  handleAddToFavourite,
  id,
  disableFav,
  city
}) => {
  const imgSrc =
    imageSrc?.includes("developers.elementor.com") || !imageSrc
      ? "/dummy.png"
      : imageSrc;
  return (
    <div className="card-anchor">
      <div className="card">
        
        <div className="featured-img">
        <Link to={linkTo} className="card-anchor">
          <div className="card-image">
            <LazyLoadImage
              src={imgSrc}
              alt={productTitle}
              className="card-image"
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "1s" } }}
            />

          </div>
          </Link>
              <p className="type-badge"> {place_type === "hotel" ? <LiaHotelSolid /> : <PiMountainsDuotone/>} {place_type}</p>
              {disableFav ? "" : <button onClick={() => handleAddToFavourite(id)} className="favourite"> <FiHeart/></button>}
        </div>
        <Link to={linkTo} className="card-anchor">
        <div className="card-footer">
          <p className="product-title">{productTitle}</p>
          <p className="rating-reviews-light">
            <FaStar />
            {rating.toFixed(1)} <GoDotFill className="dot" />&nbsp;

            {rating && number_of_reviews === 0 ?  "1" : !rating && number_of_reviews === 0 ? "No" : number_of_reviews} reviews
            </p> 

            <p className="rating-reviews-light">

            {city}
            </p> 
            
        </div>
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default Card;
