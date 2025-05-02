import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../features/index";
import { LikeProvider } from "../shared/context/LikeContext";

const App = () => {
  return (
    <LikeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<routes.home />} />
          <Route path="/favorites" element={<routes.favorites />} />
          <Route path="/details/:id" element={<routes.details />} />
          <Route path="/compare" element={<routes.compare />} />
        </Routes>
      </Router>
    </LikeProvider>
  );
};

export default App;
