// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingP from "./components/LandingP";
import SignUp from "./components/SignUp";
import UserData from "./components/UserData";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userlist" element={<UserData />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/updateUser/:userId" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
