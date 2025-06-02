import React from 'react'
import '../assets/css/DetailsHeaderStyles.css'
import { FaStar } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { HiLocationMarker } from "react-icons/hi";
import { IoIosMail,IoMdCall } from "react-icons/io";
import generateUniqueKey from '../features/uniqueKey';

const DetailsHeader = (props) => {
  return (
    <section className="details-header">
      <div className="header-details">
        <h2 className="product-title">{props.data.name}</h2>
        <p className="rating-reviews"><span><FaStar/>{props?.data?.rating ?props?.data?.rating.toFixed(1) : '' } <GoDotFill className="dot"/> {props.data.number_of_reviews == 0 && props.data.rating !== 0 ? 1 : props.data.number_of_reviews === 0 ? 'no' : props.data.number_of_reviews} reviews</span> <GoDotFill className="dot"/> <span> <HiLocationMarker/>{props.data.address ? props.data.address : props.data.location }</span></p>
        <p className="rating-reviews">{props.data.email ?<span><IoIosMail/> {props.data.email}</span> : ""} <GoDotFill className="dot"/>{props.data.phone ? <span><IoMdCall/>{props.data.phone}</span>: ""}</p>

        <p className="product-desc">{props.data.description}</p>

        {props.data.combined_amenities === "[]" ? <h4>No Special Amenities</h4> : <div className="product-amenities">
            <h3>Amenities</h3>
            <ul>
            {props.data.place_type === "hotel" ? props.data.combined_amenities ? (props.data.combined_amenities.slice(1,-1).split(",")).map((e, i) => {
              
              return  <li key={generateUniqueKey("details-page-amenities" + e + i)}
              className="amenities">{e.replace(/['"]/g, "")}</li>
            }) : "" : ""

              }
            </ul>
        </div> }
      
      </div>
      <div className="featured-img">
        <img src={props.data.is_image_file ? props.data.image_file : props.data.image_url ? props.data.image_url : '/dummy.png' } alt={props.data.name} className="card-image" />
      </div>
    </section>
  )
}

export default DetailsHeader