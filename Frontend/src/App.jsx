// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingP from "./components/LandingP";
import SignUp from "./components/SignUp";
import UserData from "./components/UserData";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userlist" element={<UserData />} />
        <Route path="/createuser" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
