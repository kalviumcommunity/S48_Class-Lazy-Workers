// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingP from "./components/LandingP";
import SignUp from "./components/SignUp";
import UserList from "./components/UserData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
