// import React, { useState, useEffect } from "react";
// import "../assets/css/FormStyles.css";
// import { getToken, removeToken } from "../services/localStorageService";
// import { useGetLoggedUserQuery } from "../services/userAuthAPI";
// import { useNavigate } from "react-router-dom";
// import verifyToken from "../features/verifyToken";
// import generateUniqueKey from "../features/uniqueKey";

// const place_type = [
//   { name: "Hotel", type: "hotel" },
//   { name: "Attraction", type: "attraction" },
// ];

// const cities = [
//   { name: "Karachi", type: "karachi" },
//   { name: "Islamabad", type: "islamabad" },
//   { name: "lahore", type: "lahore" },
// ];

// const AddNewPlace = () => {
//   const [placeType, setPlaceType] = useState(place_type[0].name);
//   const [city, setCity] = useState(place_type[0].name);

//   const navigate = useNavigate();

//   const { access_token } = getToken();
//   const { data: userProData, isSuccess: userProDataIsSuccess } =
//     useGetLoggedUserQuery(access_token);

//   const [server_error, setServerError] = useState({});
//   const [server_msg, setServerMsg] = useState(false);
//   const [generalError, setGeneralError] = useState();

//   useEffect(() => {
//     const callVerifyToken = async () => {
//       if (!(await verifyToken())) {
//         navigate("/login");
//       }
//     };
//     callVerifyToken();
//   }, [navigate, userProData, userProDataIsSuccess]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [hotelImage, setHotelImage] = useState("");

//   const handleImage = (e) => {
//     setHotelImage(e.target.files[0]);
//   };

//   const handleAddNewPlace = async (e) => {
//     e.preventDefault();

//     setIsLoading(true);
//     try {
//       setGeneralError("");
//       const { access_token } = getToken();

//       const data = new FormData(e.currentTarget);
//       data.append("name", data.get("place-name"));
//       data.append("location", data.get("place-location"));
//       data.append("city", city);
//       data.append("place_type", placeType.toLocaleLowerCase());

//       if (hotelImage?.uri) {
//         const fileName = hotelImage.uri.split("/").pop();

//         const fileType = fileName.split(".").pop();

//         data.append("place-image", {
//           is_image_file: true,
//           image_file: hotelImage.uri,
//           username: `${fileName}.${fileType}`,
//           type: "image/jpeg",
//         });
//       }

//       data.append("user", userProData.id);
//       const re = await fetch("http://127.0.0.1:8000/api/place-list-create/", {
//         body: data,
//         method: "POST",
//         headers: {
//           Authorization: "Bearer " + access_token,
//         },
//       });
//       if (re.status === 401) {
//         removeToken();

//         navigate("/login");
//         setIsLoading(false);
//       } else {
//         const res = await re.json();

//         if (res.errors) {
//           setServerMsg(false);
//           setServerError(res.errors);
//           setIsLoading(false);
//         } else if (!res.errors) {
//           navigate("/");

//           setServerError({});
//           setServerMsg(true);
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       setGeneralError("An error occured, try again later!");
//       setServerError({});
//       setServerMsg(false);
//       setIsLoading(false);
//     }
//   };

//   const handlePlaceTypeChange = (event) => {
//     setPlaceType(event.target.value.toLocaleLowerCase());
//   };

//   const handleCity = (event) => {
//     setCity(event.target.value.toLocaleLowerCase());
//   };

//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h3>Add New Place</h3>
//         <form onSubmit={handleAddNewPlace}>
//           <div className="form-group">
//             <label htmlFor="place-name">Place Name</label>

//             <input
//               type="text"
//               id="place-name"
//               name="place-name"
//               placeholder="What's the place name?"
//             />
//             {server_error?.name ? (
//               <p className="form-field-error">{server_error.name[0]}</p>
//             ) : (
//               ""
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="place-location">Location</label>
//             <input
//               type="text"
//               id="place-location"
//               name="place-location"
//               placeholder="Where it is?"
//             />
//             {server_error?.location ? (
//               <p className="form-field-error">{server_error.location[0]}</p>
//             ) : (
//               ""
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="place-location">City</label>
//             <select value={city} onChange={handleCity}>
//               {cities.map((e, i) => {
//                 return (
//                   <option key={generateUniqueKey("place_type" + e.name + i)}>
//                     {e.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {server_error?.city ? (
//               <p className="form-field-error">{server_error.city[0]}</p>
//             ) : (
//               ""
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="place-location">Type</label>
//             <select value={placeType} onChange={handlePlaceTypeChange}>
//               {place_type.map((e, i) => {
//                 return (
//                   <option key={generateUniqueKey("place_type" + e.name + i)}>
//                     {e.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {server_error?.place_type ? (
//               <p className="form-field-error">{server_error.place_type[0]}</p>
//             ) : (
//               ""
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="place-location">Phone</label>
//             <input
//               type="text"
//               id="place-contact"
//               name="place-contact"
//               placeholder="Email or Phone"
//             />
//             {server_error?.phone ? (
//               <p className="form-field-error">{server_error.phone[0]}</p>
//             ) : (
//               ""
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="place-location">Picutres</label>
//             <input
//               type="file"
//               accept="image/*"
//               name="place-image"
//               onChange={handleImage}
//             />
//           </div>
//           {server_error?.non_field_errors ? (
//             <p className="form-field-error">
//               {server_error.non_field_errors[0]}
//             </p>
//           ) : (
//             ""
//           )}

//           <button type="submit" className="form-button">
//             Add Place
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNewPlace;

import React, { useState, useEffect } from "react";
import "../assets/css/FormStyles.css";
import { getToken, removeToken } from "../services/localStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthAPI";
import { useNavigate } from "react-router-dom";
import verifyToken from "../features/verifyToken";
import generateUniqueKey from "../features/uniqueKey";

const place_type = [
  { name: "Hotel", type: "hotel" },
  { name: "Attraction", type: "attraction" },
];

const cities = [
  { name: "Karachi", type: "karachi" },
  { name: "Islamabad", type: "islamabad" },
  { name: "Lahore", type: "lahore" },
];

const AddNewPlace = () => {
  const [placeType, setPlaceType] = useState(place_type[0].type);
  const [city, setCity] = useState(cities[0].type);
  const [hotelImage, setHotelImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data: userProData, isSuccess: userProDataIsSuccess } = useGetLoggedUserQuery(access_token);

  useEffect(() => {
    const callVerifyToken = async () => {
      if (!(await verifyToken())) {
        navigate("/login");
      }
    };
    callVerifyToken();
  }, [navigate, userProData, userProDataIsSuccess]);

  const handleImage = (e) => {
    setHotelImage(e.target.files[0]);
  };

  const handleAddNewPlace = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      setGeneralError("");
      const data = new FormData();

      data.append("name", e.target["place-name"].value);
      data.append("location", e.target["place-location"].value);
      data.append("city", city);
      data.append("place_type", placeType);

      if (hotelImage) {
        data.append("image_file", hotelImage); // Append the file directly
      }

      data.append("user", userProData.id);

      const response = await fetch("http://127.0.0.1:8000/api/place-list-create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: data,
      });

      if (response.status === 401) {
        removeToken();
        navigate("/login");
        setIsLoading(false);
      } else {
        const res = await response.json();
        if (res.errors) {
          setServerMsg(false);
          setServerError(res.errors);
          setIsLoading(false);
        } else {
          navigate("/");
          setServerError({});
          setServerMsg(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setGeneralError("An error occurred, try again later!");
      setServerError({});
      setServerMsg(false);
      setIsLoading(false);
    }
  };

  const handlePlaceTypeChange = (e) => {
    setPlaceType(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h3>Add New Place</h3>
        <form onSubmit={handleAddNewPlace}>
          <div className="form-group">
            <label htmlFor="place-name">Place Name</label>
            <input
              type="text"
              id="place-name"
              name="place-name"
              placeholder="What's the place name?"
            />
            {server_error?.name && <p className="form-field-error">{server_error.name[0]}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="place-location">Location</label>
            <input
              type="text"
              id="place-location"
              name="place-location"
              placeholder="Where is it?"
            />
            {server_error?.location && <p className="form-field-error">{server_error.location[0]}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select value={city} onChange={handleCityChange}>
              {cities.map((cityObj, index) => (
                <option key={generateUniqueKey(`city_${cityObj.name}_${index}`)} value={cityObj.type}>
                  {cityObj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="place-type">Type</label>
            <select value={placeType} onChange={handlePlaceTypeChange}>
              {place_type.map((typeObj, index) => (
                <option key={generateUniqueKey(`type_${typeObj.name}_${index}`)} value={typeObj.type}>
                  {typeObj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="place-contact">Phone</label>
            <input
              type="text"
              id="place-contact"
              name="place-contact"
              placeholder="Email or Phone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="place-image">Pictures</label>
            <input
              type="file"
              id="place-image"
              name="place-image"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          {generalError && <p className="form-field-error">{generalError}</p>}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Place"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPlace;
