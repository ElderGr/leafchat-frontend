import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Navbar from '../components/Navbar';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="home" element={<Navbar />}>
        <Route path="" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
