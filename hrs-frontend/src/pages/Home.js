import React, { useEffect, useContext, useState } from "react";
import Hero from "../components/Hero";
import FeaturedCities from "../components/FeaturedCities";
import HotelsAndAttractions from "../components/HotelsAndAttractions";
import { ProgressContext } from "../contexts/ProgressContext";
import "../assets/css/HomeStyles.css";
import { useGetLoggedUserQuery } from "../services/userAuthAPI";
import { getToken } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { fetchPlaces } from "../services/customFetchAPI";
import Loader from "../components/Loader";



const Home = () => {


  const [page, setPage] = useState(1);
  const [items, setItems] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  });
  const [sortByCollabrativeDone , setSortByCollabrativeDone] = useState(false)
  const [fetchingForNonLoggedInUser, setFetchingForNonLoggedInUser] = useState(false)
  const { access_token } = getToken();
  const navigate = useNavigate();
  const setProgress = useContext(ProgressContext);
  const { data, isSuccess, error } = useGetLoggedUserQuery(access_token);
  // items, setPage, type, heading, subHeading
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);
  const query = "";
  const [filters, setFilters] = useState({
    // user: data?.user,
    sort_by: "collabrative-filtering",
    related: true,
  });

  const callFetchPlaces = async ({
    fetchedOrUpdatedQuery,
    fetchedOrUpdatedFilters,
    isPageConcat,
  }) => {
    try {
      setProgress(0)
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

      if (filters.sort_by === "collabrative-filtering"){
        setSortByCollabrativeDone(true)
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setItems((prev) => ({
        ...prev,
        isFetching: false,
        isSuccess: false,
        isFailed: true,
      }));
      setProgress(100)

    }
  };

  useEffect(() => {
    if (data && isSuccess) {
      callFetchPlaces({
        fetchedOrUpdatedQuery: query,
        fetchedOrUpdatedFilters: { ...filters, user: data.id },
      });

    }
  }, [data, isSuccess]);

  useEffect(() => {
    if ((error || (sortByCollabrativeDone && items.results.length === 0))) {
      callFetchPlaces({
        fetchedOrUpdatedQuery: query,
        fetchedOrUpdatedFilters: { ...filters, sort_by: "recommendation" },
      });
    }
  }, [error, filters, sortByCollabrativeDone, data, isSuccess]);

  return (
    <React.Fragment>
      <Hero />
      <section className="home-content-wrapper">
        <FeaturedCities />

<HotelsAndAttractions
              type="featured"
              heading="Relevant For You"
              items={items}
              page={page}
              setPage={setPage}
              related={true}
              filters={filters}
              setFilters={setFilters}

            />
      </section>
    </React.Fragment>
  );
};

export default Home;
