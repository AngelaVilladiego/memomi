import "./Focus.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../AboutPage/About";
import Features from "../Features";
import Contact from "../Contact";
import NaviBar from "../../components/NaviBar/NaviBar";
import Memo from "../../components/Memo/Memo";
import SearchBar from "../../components/SearchBar/SearchBar"

function Focus() {
  return (
    <div className="bg-default h-svh flex flex-col items-center p-8">
      <Router>
        <NaviBar />
        <Routes>
          <Route path="/" exact component={Memo} />
          <Route path="/about" component={About} />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>
    </div>
  );
}


export default Focus;
