import React from 'react'
import '../assets/css/TopbarStyles.css';
import { IoIosMail } from "react-icons/io";
import { HiLocationMarker } from 'react-icons/hi';
import { MdOutlineAccessTimeFilled } from "react-icons/md";


const Topbar = () => {
  return (
    <div className="topbar">
        <div className="content">
          <div className="content-group">

            <p className='parkinsans-sm-text-light'><MdOutlineAccessTimeFilled/>Mon–Sat: 9am to 6pm</p>
            <p className='parkinsans-sm-text-light'><HiLocationMarker/>Houston, USA 485</p>
          </div>

          <div className="content-group">

          <p className='parkinsans-sm-text-light'><IoIosMail/>contact@travelwise.com</p>
          <div id="google_translate_element" style={{ display: 'inline-block' }}></div>
</div>

        </div>
    </div>
  )
}

export default Topbar