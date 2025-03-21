import React from 'react'
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

const App = ()=>{
  return (
  <div>
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path = "/" element = { <Home/>}/>
      <Route path = "/all-books" element = {<AllBooks/>}/>
      <Route path = "/cart" elementlement = {<Cart/>}/>
      <Route path = "/profile" elementlement = {<Profile/>}/>
      <Route path = "/SignUp" elementlement = {<SignUp/>}/>
      <Route path = "/LogIn" elementlement = {<LogIn/>}/>
      
    </Routes>
    <Footer/>

    </Router>
    
    
    

  </div>
  );
};

export default App;