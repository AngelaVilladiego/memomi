import "./Focus.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../AboutPage/About";
import Features from "../Features";
import Contact from "../Contact";
import NaviBar from "../../components/NaviBar/NaviBar";
import Logo from "../../components/NaviBar/Logo.png";
import Memo from "../../components/Memo/Memo";
import RightBinder from "./rightBinder.png";
import MiddleBinder from "./middleBinder.png";
import Memopad from "./MemoPad.png"
import Pile from "./pile.png"
import TagDisplay from "../../components/TagDisplay";
import SummaryTable from "../../components/SummaryTable/SummaryTable"

function Focus() {
  const memos = {Titles:["Title1", "Title2", "Title3","Title1", "Title2", "Title3","Title1", "Title2", "Title3"], Dates:["Date1", "Date2", "Date3","Date1", "Date2", "Date3","Date1", "Date2", "Date3"]}
  return (
    <div className="bg-default bg-repeat-y h-1000 flex flex-col items-center justify-start">
      
      <div className="h-svh flex flex-col items-center p-8">
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

      <div className="mt-0 absolute top-5/12 rounded-lg w-5/6">
        <img src={RightBinder} alt='RightBinder' className="absolute top-0"></img>
        <img src={MiddleBinder} alt='MiddleBinder' className="absolute top-0"></img>
        <div className="absolute top-0 left-20 w-475">
          <img src={Memopad} alt='Memopad'></img>
          <div className="absolute top-200 left-47 w-375 h-500 flex flex-col items-center justift-start">
            <h2 className="font-sans font-bold text-memoblue-400 text-3xl mb-2">
              MY MEMO
            </h2>
            <p className="font-sans text-center text-wrap text-memoblue-400 text-xs mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius leo tellus, vel ullamcorper risus semper eu. Morbi molestie, massa.
            </p>

            <p className="font-sans text-center text-wrap text-memoblue-400 text-sm">
            placeholder for search bar
            </p>
            <div className="absolute top-0 mt-0 scroll-smooth focus:scroll-auto ">
              <SummaryTable memos={memos} className="absolute top-0"/>
            </div>
          </div>
        </div>
        <div className="absolute top-80 right-20 w-475">
          <img src={Pile} alt='pile1'className="absolute top-5 right-0"></img>
          <img src={Pile} alt='pile2' className="absolute top-2.5 right-2.5"></img>
          <img src={Pile} alt='pile3' className="absolute top-0 right-5"></img>
        </div>
        <div className="absolute top-850 text-transparent">hahahahhahhaa</div>
      </div>
    </div>
  );
}

function AIOn() {
  var AItags = document.getElementById("AISuggestions");
  AItags.style.display =
    AItags.style.display === "none" || AItags.style.display === ""
      ? "block"
      : "none";
}

export default Focus;
