import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Rating from './Components/Rating';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/rating" element={<Rating />} />
    </Routes>
  </Router>
);

