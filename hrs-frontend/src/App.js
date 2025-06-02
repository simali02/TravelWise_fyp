import React,  { useState, useRef }  from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './layout/index';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Listings from './pages/Listings';
import AddNewPlace from './components/AddNewPlace';
import Details from './pages/Details';
import Weather from './pages/Weather';
import { ProgressContext } from './contexts/ProgressContext';
import Favourites from './pages/Favourites';

function App() {
  const [progress, setProgress] = useState(0); 
  const loaderRef = useRef(null);

  const handleSetProgress = (value) => {
    setProgress(value);
    loaderRef.current?.continuousStart();
    if (value === 100) {
      setTimeout(() => loaderRef?.current?.complete(), 500); 
    }
  };

  return (
    <React.Fragment>

    <Router>
    <ProgressContext.Provider value={handleSetProgress}>
    <Routes>
      <Route path="/" element={<Layout loaderRef={loaderRef} progress={progress} />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listings" element={<Listings/>} />
        <Route path="/add-place" element={<AddNewPlace/>} />
        <Route path="/details/:id/" element={<Details/>} />
        <Route path="/weather" element={<Weather/>} />
        <Route path="/favourites" element={<Favourites/>} />
        
      </Route>
    </Routes>
    </ProgressContext.Provider>

  </Router>
  </React.Fragment>
  );
}

export default App;
