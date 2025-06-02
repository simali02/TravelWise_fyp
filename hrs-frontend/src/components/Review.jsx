import React from 'react'
import '../assets/css/ReviewStyles.css';
import { FaStar } from "react-icons/fa6";
import generateUniqueKey from '../features/uniqueKey';
import formattedDate from '../features/formatDate';

const Review = (props) => {
    const rating_number = props.data.rating.toFixed(1);
    const initials = props.data.user.username.split(' ').slice(0, 2).map(word => word[0].toUpperCase()).join('');

  return (
    <div className="review">
        <div className="name-logo">
            {initials}
        </div>

        <div className="review-content">
            <p className="reviewer-name">{props.data.user.username} <span className={`sen ${props.data.sentiment === "positive" ? "sen-green" : props.data.sentiment === "negative" ? "sen-red" : "sen-gray"}`}>{props.data.sentiment}</span></p>
            <p className="reviewer-ratings">{rating_number}<span>{[...Array(parseInt(rating_number))].map((_, i) => {
            return <FaStar key={generateUniqueKey("reviewer-rating-filled_stars" + i)} />;
          })} </span><span style={{fontSize: '1.2rem'}}>{formattedDate(props.data.created_at)}</span> </p>
            <p className="review-text">{props.data.review_text}</p>
        </div>
    </div>
  )
}

export default Review