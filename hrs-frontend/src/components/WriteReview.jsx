import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../assets/css/WriteReviewStyles.css';
import generateUniqueKey from "../features/uniqueKey";
import { useSubmitReviewMutation } from "../services/userAuthAPI";

const WriteReview = ({ user, place, setReviewSuccess }) => {
  const [server_error, setServerError] = useState({});
  const [generalError, setGeneralError] = useState("");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");

  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const handleSubmit = async (e) => {
    try {
      setGeneralError("");
      e.preventDefault();
      const actualData = {
        review_text: review,
        rating: rating,
        user: user,
        place: place,
      };
      const res = await submitReview(actualData);
      if (res.error) {
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        setReviewSuccess(true);
      }
    } catch (error) {
      setServerError({});
      setGeneralError("An error occurred, try again later!");
    }
  };

  return (
    <div className="review-container">
      <h4>Write a Review</h4>
      <div className="stars">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              key={generateUniqueKey("write-a-reivew-star" + i)}
              className={`star ${starValue <= (hover || rating) ? "start-active" : ""}`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>

      <div className="write-review">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          rows={3}
        />
        <button disabled={!review} className="primary-btn-sm" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default WriteReview;
