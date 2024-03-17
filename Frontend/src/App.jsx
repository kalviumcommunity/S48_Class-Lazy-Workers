// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingP from "./components/LandingP";
import SignUp from "./components/SignUp";
import UserData from "./components/UserData";
import UpdateUser from "./components/UpdateUser";
import Login from "./components/Login";
import Popup from "./components/Popup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userlist" element={<UserData />} />
        <Route path="/updateUser/:userId" element={<UpdateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
