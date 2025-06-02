const baseUrl = "http://127.0.0.1:8000/api/"

const fetchPlaces = async (data) => {
    try {
      let url;
      
      if (data.filters?.sort_by === "collabrative-filtering") {
        url = `collabrative-recommendations/${data.filters?.user}/`

      }

      else if (data.filters?.sort_by === "rating" || data.filters?.sort_by === "reviews") {
        url = `place-list-create?page=${data.page ? data.page : ''}&ordering=${
          data.filters?.sort_by === "rating" ? "-rating" : "-number_of_reviews"
        }&city=${
          data.filters?.city ? data.filters?.city.toLowerCase() : ""
        }&type=${data.filters?.place_type || ""}`;
      }
      else  {
        // url = `recommendations?query=${encodeURIComponent(data.query ? data.query : '')}&city=${
        url = `recommendations?query=${encodeURIComponent(data.query ? data.query : '')}&city=${
          data.filters?.city ? data.filters?.city.toLowerCase() : ""
        }&type=${
          data.filters?.place_type || ""
        }&subcategories=${data.filters?.subcategories || ""}&amenities=${
          data.filters?.amenities || ""
        }&related=${data.filters?.related ? true : '' }`;
      } 
      const response = await fetch(baseUrl+url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
  
      return result; 
    } catch (error) {
      console.error("Error fetching places:", error);
      throw error; 
    }
  };

  const fetchFavourite = async (data) => {
    try {
      let url = `favourite/?user=${data?.user ? data?.user : ''}`
      const response = await fetch(baseUrl+url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
  
      return result; 
    } catch (error) {
      console.error("Error fetching places:", error);
      throw error; 
    }
  };

  const addToFavourite = async (data) => {
    try {
      let url = `favourite/`
      const response = await fetch(baseUrl+url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
  
      return result; 
    } catch (error) {
      console.error("Error fetching places:", error);
      throw error; 
    }
  };

  export {fetchPlaces, fetchFavourite, addToFavourite};