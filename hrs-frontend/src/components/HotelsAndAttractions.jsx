import React, { useEffect, useState } from "react";
import "../assets/css/FeaturedCardsSectionStyles.css";
import HotelAndAttractionCard from "./HotelAndAttractionCard";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import generateUniqueKey from "../features/uniqueKey";
import AnimatedParagraph from "./AnimatedParagraph";
import Loader from "../components/Loader";
import TopLoadingBar from "react-top-loading-bar";
import { getToken } from "../services/localStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthAPI";
import verifyToken from "../features/verifyToken";
import { addToFavourite } from "../services/customFetchAPI";
import Notification from "./Notification.jsx";

const HotelsAndAttractions = React.memo((props) => {
  const cities = [
    { name: "Karachi", type: "karachi" },
    { name: "Lahore", type: "lahore" },
    { name: "Islamabad", type: "islamabad" },
  ];
  const { items, setPage, type, heading } = props;
  // const [server_error, setServerError] = useState({});
  // const [generalError, setGeneralError] = useState();
  // const [userID, setUserID] = useState();
  const { access_token } = getToken();
  // const navigate = useNavigate();
  const { data: userProData, isSuccess: userProDataIsSuccess } =
    useGetLoggedUserQuery(access_token, { skip: !access_token });

  const fetchNextPage = () => {
    if (items?.next && !items?.isFetching) {
      setPage(props.page + 1);
    }

  };

  const handleAddToFavourite = async (place_id) => {
    try {
      // setGeneralError("");
      const actualData = {
        user: userProData.id,
        place: place_id,
      };
      const res = await addToFavourite(JSON.stringify(actualData));
      if (res.error) {
        // setServerError(res.error.data.errors);
        triggerNotification("Already in your favourites!", "error");
      } else {
        triggerNotification("Added to favourites successfully!", "success");
      }
    } catch (error) {
      // setServerError({});
      triggerNotification("Already in your favourites!", "error");

      // setGeneralError("An error occured, try again later!");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (!(await verifyToken())) {
      } else if (userProDataIsSuccess && userProData) {
        // setUserID(userProData.id);
      }
    };
    initialize();
  }, []);

  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (msg, type) => {
    setNotification({ message: msg, type });
  };

  const handleCityChange = (city) => {
    props.setFilters({ ...props.filters, city: props.filters.city === city ? "" : city });
  };

  return (
    <section className="featured-cards">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

      {true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items?.description && !items?.isFetching && !items?.isSuccess ? (
            <AnimatedParagraph text={items?.description} />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {type !== "listing" && (
        <div className="content">
          <h2>{heading}</h2>
        </div>
      )}
        {type === "featured" && props?.home_page  && props?.home_page?.sort_by !== "collabrative-filtering" ? <div className="rating-buttons" style={{width: '100%', justifyContent: 'center'}}>
          {cities.map((c, i) => (
            <button
              disabled={items?.isFetching}
              key={generateUniqueKey("home-page-filter-city" + c["type"] + i)}
              className={`rating-button ${
                c["type"] === props.filters?.city ? "active" : ""
              }`} style={{flexGrow: 'unset', flexBasis: 'unset'}}
              onClick={() => {
                props.setFilters({ ...props.filters, city: c });
                handleCityChange(c["type"]);
              }}
            >
              {c["name"]}
            </button>
          ))}
        </div>: ''}
      
      {items?.description && !props.related ? (
        <AnimatedParagraph text={items?.description} />
      ) : (
        ""
      )}
      {/* {items?.isFetching ? <LineLoader loiprogress /> : ""} */}
      <TopLoadingBar
        height={4}
        color="#0c4d2a"
        progress={items?.isFetching ? 30 : 100}
      />

      <InfiniteScroll
        dataLength={items?.results?.length}
        next={fetchNextPage}
        hasMore={!!items.next}
        loader={<Loader />}
      >
        <div className="cards">
          {items?.results.map((e, i) => (
            <HotelAndAttractionCard
              key={generateUniqueKey(
                "hotel-and-attraction-card" + e.name + i + e.id
              )}
              imageSrc={e.is_image_file ? e.image_file : e.image_url ? e.image_url : '/dummy.png'}
              productTitle={e.name}
              number_of_reviews={e.number_of_reviews}
              rating={e.rating}
              subcategories={e.subcategories}
              place_type={e.place_type}
              ranking={e.ranking}
              linkTo={`/details/${e.id}`}
              id={e.id}
              handleAddToFavourite={handleAddToFavourite}
              disableFav={props.disableFav}
              city={e.city}
            />
          ))}
        </div>
      </InfiniteScroll>
      {!items?.isFetching && items.results.length === 0 ? (
        <p>Start giving reviews to find your best matches!</p>
      ) : (
        ""
      )}
    </section>
  );
});

HotelsAndAttractions.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  setPage: PropTypes.func,
};

HotelsAndAttractions.defaultProps = {
  type: "default",
  heading: "",
  subHeading: "",
  setPage: () => {},
};

export default HotelsAndAttractions;
