import React, { useEffect, useState } from "react";
import "../assets/css/DetailsReviewsStyles.css";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import Review from "./Review";
import WriteReview from "./WriteReview";
import generateUniqueKey from "../features/uniqueKey";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetLoggedUserQuery, useGetReviewsQuery } from "../services/userAuthAPI";
import { getToken } from "../services/localStorageService";
import Loader from '../components/Loader';

const DetailsReviews = (props) => {
  const { access_token } = getToken()
  const [userID, setUserID] = useState("")
  const [userCanReview, setUserCanReview] = useState(false);
  const { data: loggedUserData, isSuccess: isLoggedUserSuccess } = useGetLoggedUserQuery(access_token, {
    skip: !access_token,  
  });
  // const [reviewSuccess, setReviewSuccess] = useState(false)
  const {
    data: dataReviews,
    // isFetching: isFetchingReviews,
    isSuccess: isSuccessReviews,
  } = useGetReviewsQuery(
    { user: userID, place: props.data.id },
    {
      skip: !isLoggedUserSuccess,
    }
  );

  useEffect(() => {
    if (isLoggedUserSuccess && !!loggedUserData){
      setUserID(loggedUserData.id)
    }

  }, [loggedUserData, isLoggedUserSuccess]);


  useEffect(() => {
    if (isSuccessReviews && !!dataReviews){
      setUserCanReview((dataReviews?.results?.length === 0) ? true : false)
    }
  }, [dataReviews, isSuccessReviews]);

  const fetchNextPage = () => {
    if (!props.isFetchingReviews && props.reviews.next) {
      props.setReviewsPage((prevPage) => prevPage + 1);
    }
  };

  const rating_number = (props?.data?.rating)?.toFixed(1);

  return (
    <div className="details-reviews">
      <h3>Ratings & Reviews</h3>

      <div className="ratings-and-write-review-combined">
        <div className="overall-ratings">
          <h1>{rating_number}</h1>
          {rating_number ? <div className="ratings">
            {rating_number && (
              <div className="rating-stars">
                {[1,2,3,4,5].map((_, i) => (
                  <FaStar key={generateUniqueKey(`filled_star_${i}`)} />
                ))}
              </div>
            )}
            <div className="rating-annotates">
              <p className="total-ratings">Total Reviews: {props.data.number_of_reviews === 0 && props.data.rating !== 0 ? 1 : props.data.number_of_reviews === 0 ? 'no' : props.data.number_of_reviews}</p>
            </div>
          </div> : "No Rating Data"}
        </div>
        {userCanReview && !props.reviewSuccess ? <WriteReview user={userID} place={props.data.id} setReviewSuccess={props.setReviewSuccess}/> : ""}
      </div>

      <InfiniteScroll
        dataLength={props?.reviews?.results?.length}
        next={fetchNextPage}
        hasMore={!!props?.reviews?.next}
        loader={<Loader/>}>
      
        {props?.reviews?.results?.map((item, i) => (
          <Review
            key={generateUniqueKey(`review_${item.id}_${i}`)}
            data={item}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default DetailsReviews;
