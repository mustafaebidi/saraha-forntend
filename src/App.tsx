import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {  Outlet } from "react-router-dom";
import Screen from './components/Screen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {



  
  return (
    <div className="App">
      <Navbar/>
        <Screen>
          <Outlet/>
        </Screen>
      <Footer/>
      <ToastContainer
        
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"

      />

    </div>
  );
}

export default App;
