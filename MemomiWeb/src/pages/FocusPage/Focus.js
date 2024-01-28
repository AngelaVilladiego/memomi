import "./Focus.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../AboutPage/About";
import Features from "../Features";
import Contact from "../Contact";
import NaviBar from "../../components/NaviBar/NaviBar";
import Logo from "../../components/NaviBar/Logo.png";
import Memo from "../../components/Memo/Memo";
import LoginButton from "../../components/LoginButton/LoginButton";
import RightBinder from "./rightBinder.png";
import MiddleBinder from "./middleBinder.png";
import Memopad from "./MemoPad.png";
import SummaryTable from "../../components/SummaryTable/SummaryTable";
import SearchBar from "./Search barsearchbar.png";

function Focus() {
  const memos = {
    Titles: ["Title1", "Title2", "Title3", "Title1", "Title2", "Title3"],
    Dates: ["Date1", "Date2", "Date3", "Date1", "Date2", "Date3"],
  };
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
        <div>
          <img
            src={RightBinder}
            alt="RightBinder"
            className="absolute top-0"
          ></img>
          <p className="hover:cursor-pointer hover:font-semibold absolute top-10 right-110 font-sans text-memoblue-400">
            Inbox
          </p>
        </div>
        <div>
          <img
            src={MiddleBinder}
            alt="MiddleBinder"
            className="absolute top-0"
          ></img>
          <p className="absolute top-10 right-252 font-sans font-semibold text-memoblue-400 hover:cursor-pointer hover:font-semibold">
            My Memos
          </p>
        </div>
        <div className="absolute top-0 left-20 w-475">
          <img src={Memopad} alt="Memopad"></img>
          <div className="absolute top-200 left-47 w-375 h-500 flex flex-col items-center justift-start">
            <h2 className="font-sans font-bold text-memoblue-400 text-3xl mb-2">
              MY MEMO
            </h2>
            <p className="font-sans text-center text-wrap text-memoblue-400 text-xs mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              varius leo tellus, vel ullamcorper risus semper eu. Morbi
              molestie, massa.
            </p>

            <p className="font-sans text-center text-wrap text-memoblue-400 text-sm">
              <img src={SearchBar} alt="Searchbar"></img>
            </p>
            <div className="absolute top-0 mt-0 scroll-smooth focus:scroll-auto ">
              <SummaryTable memos={memos} className="absolute top-0" />
            </div>
          </div>
        </div>
        <div className="absolute top-80 right-20 w-475">
          <Memo />
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
