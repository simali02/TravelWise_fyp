import React, { useEffect, useContext, useState } from "react";
import HotelsAndAttractions from "../components/HotelsAndAttractions";
import "../assets/css/ListingStyles.css";
import PropTypes from "prop-types";
import { ProgressContext } from "../contexts/ProgressContext";
import { fetchFavourite } from "../services/customFetchAPI";
import Loader from "../components/Loader";
import NoResults from "../components/NoResults";
import { getToken } from "../services/localStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthAPI";
import verifyToken from "../features/verifyToken";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const setProgress = useContext(ProgressContext);
  const navigate = useNavigate();
  const { access_token } = getToken();

  const { data: userProData, isSuccess: userProDataIsSuccess } =
    useGetLoggedUserQuery(access_token, { skip: !access_token });

  const [page, setPage] = useState(1);
  const [items, setItems] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    isFetching: false,
    isSuccess: false,
  });
  const [userId, setUserId] = useState(null);

  // Verify token and fetch user details once
  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    } else {
      const initialize = async () => {
        if (!(await verifyToken())) {
          navigate("/login");
        } else if (userProDataIsSuccess && userProData) {
          console.log('userProData', userProData.id)
          setUserId(userProData.id);
        }
      };
      initialize();
    }
  }, [access_token, navigate, userProDataIsSuccess, userProData]);

  // Fetch favourites whenever userId or page changes

  const callFetchFavourite = async (isPageConcat = false) => {
    try {
      setItems((prev) => ({ ...prev, isFetching: true, isSuccess: false }));
      const res = await fetchFavourite({
        user: userId,
        page,
      });

      const places = res.results.map((result) => result.place); 

      setItems((prev) => ({
        ...res,
        isSuccess: true,
        isFetching: false,
        results: isPageConcat ? prev.results.concat(places) : places,
      }));
    } catch (error) {
      console.error("Error fetching places:", error);
      setItems((prev) => ({ ...prev, isFetching: false, isSuccess: false }));
    }
  };


  useEffect(() => {
    if (!userId) return;

    callFetchFavourite(page > 1); // Concatenate results if it's not the first page
  }, [userId, page]);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <section className="listing-wrapper">
      <div className="listing-header">
        <h2>Favourites</h2>
      </div>
      <div className="listing-content">
        {items?.results?.length > 0 ? (
          <HotelsAndAttractions
            type="listing"
            heading=""
            setPage={setPage}
            page={page}
            items={items}
            disableFav={true}
          />
        ) : items?.isFetching ? (
          <Loader />
        ) : (
          <NoResults message="You have no Favourite." />
        )}
      </div>
    </section>
  );
};

Favourites.propTypes = {
  choice: PropTypes.string.isRequired,
};

export default Favourites;
