import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";

export const AuthContext = React.createContext(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/Login" element={ <Login/> }/>
          <Route path="/Register" element={ <Register/> }/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
