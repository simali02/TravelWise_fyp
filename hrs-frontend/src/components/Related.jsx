import React, {useState} from "react";
import "../assets/css/RelatedStyles.css";
import HotelsAndAttractions from '../components/HotelsAndAttractions';


const Related = () => {
  const [items, setItems] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    loading: true,
  });
  return (

    
    <div className="realted-products">
      <h4>You may also like</h4>
      <HotelsAndAttractions
          type="listing"
          heading="Top Hotels"
          subHeading="Explore the best options available in your desired category."
          query={""}
          filters={""}
          // setPage={1}
          setItems={setItems}
          items={items}
          page={1}
        />
      {/* <HotelsAndAttractions type="listing" heading="Top Hotels" subHeading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatum? Ducimus nostrum beatae placeat illo." products={products} /> */}

    </div>
  );
};

export default Related;
