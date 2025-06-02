import React, { useEffect, useContext, useState } from "react";
import DetailsHeader from "../components/DetailsHeader";
import DetailsReviews from "../components/DetailsReviews";
import { ProgressContext } from "../contexts/ProgressContext";
import { useParams } from "react-router-dom";
import {
  useRetrievePlaceQuery,
  useGetReviewsQuery,
} from "../services/userAuthAPI";
import HotelsAndAttractions from "../components/HotelsAndAttractions";
import { fetchPlaces } from "../services/customFetchAPI";

const Details = () => {
  const setProgress = useContext(ProgressContext);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [reviews, setReviews] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filters, setFilters] = useState({
    city: "",
    place_type: "",
    sort_by: "recommendations",
    related: true,
  });
  const query = "";
  const {
    data: placeData,
    isFetching: isFetchingPlace,
    isSuccess: isPlaceSuccess,
  } = useRetrievePlaceQuery({ id });

  const {
    data: reviewsData,
    isFetching: isFetchingReviews,
    isSuccess: isReviewsSuccess,
    refetch: refetchReviews,
  } = useGetReviewsQuery({ place: id, page: reviewsPage });

  useEffect(() => {
    if (isPlaceSuccess && placeData) {
      setItem(placeData);
      setFilters({
        ...filters,
        city: placeData.city,
        place_type: placeData.place_type,
      });
      
    }
  }, [placeData, isPlaceSuccess]);

  useEffect(() => {
    if (isReviewsSuccess && reviewsData) {
      setReviews((prevReviews) => {
        const uniqueResults = [
          ...(reviewsPage === 1 || reviewSuccess ? [] : prevReviews.results),
          ...reviewsData.results.filter(
            (newItem) =>
              !prevReviews.results.some(
                (prevItem) => prevItem.id === newItem.id
              )
          ),
        ];
        return {
          ...reviewsData,
          results: uniqueResults,
        };
      });
    }
  }, [reviewsData, isReviewsSuccess, reviewsPage, reviewSuccess]);

  useEffect(() => {
    if (reviewSuccess) {
      setReviewsPage(1);
      refetchReviews();
    }
  }, [reviewSuccess, refetchReviews]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    isFetching: false,
    isSuccess: false,
  });

  const callFetchPlaces = async ({
    fetchedOrUpdatedQuery,
    fetchedOrUpdatedFilters,
    isPageConcat,
  }) => {
    try{    
    setItems({ ...items, isSuccess: false, isFetching: true });

    const res = await fetchPlaces({
      query: fetchedOrUpdatedQuery,
      filters: fetchedOrUpdatedFilters,
    });
    setItems({
      ...res,
      isSuccess: true,
      isFetching: false,
      results: isPageConcat ? items.results.concat(res.results) : res.results,
    });
  } catch (error) {

    console.error("Error fetching places:", error);

  }

  };

  useEffect(() => {
    
    callFetchPlaces({
      fetchedOrUpdatedQuery: query,
      fetchedOrUpdatedFilters: filters,
    });
  }, [filters]);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return isFetchingPlace ? (
    <h2>Fetching Data...</h2>
  ) : isPlaceSuccess && item ? (
    <section className="details">
      <DetailsHeader data={item} />
      <DetailsReviews
        data={item}
        reviewsPage={reviewsPage}
        setReviewsPage={setReviewsPage}
        reviewSuccess={reviewSuccess}
        reviews={reviews}
        isFetchingReviews={isFetchingReviews}
        setReviewSuccess={setReviewSuccess}
      />

      <HotelsAndAttractions
        type="featured"
        heading="You may also like"
        page={page}
        setItems={setItems}
        items={items}
        related={true}
      />
    </section>
  ) : (
    <h2>No Data</h2>
  );
};

export default Details;
