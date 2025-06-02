import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import '../assets/css/LayoutStyles.css'
import Footer from "../components/Footer";
import TopLoadingBar from 'react-top-loading-bar';


const Layout = ({loaderRef, progress}) => {

 
  return (
    <React.Fragment>
      <Topbar />
      <Navbar />

        <TopLoadingBar height={4} color="#ffc107" ref={loaderRef} progress={progress} />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="layout-setting">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default Layout;
