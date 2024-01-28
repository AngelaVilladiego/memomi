import "./Focus.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../AboutPage/About";
import Features from "../Features";
import Contact from "../Contact";
import NaviBar from "../../components/NaviBar/NaviBar";
import Memo from "../../components/Memo/Memo";

function Focus() {
  return (
    <div className="h-svh flex flex-col items-center p-8">
      <Memo />
    </div>
    //     <div className="Focus">
    //       <div className="Focus-Title">
    //         <div>
    //           <h2>Morning Team Meeting</h2>
    //         </div>
    //         <div className="date">
    //           <h3>Date</h3>
    //           <input
    //             type="text"
    //             class="date-info"
    //             id="textBox"
    //             placeholder="27/01/24"
    //           />
    //         </div>
    //       </div>

    //       <div className="tags">
    //         <ul>
    //           <li className="attributed">Team</li>
    //           <li className="attributed">Meeting</li>
    //         </ul>
    //       </div>

    //       <div className="AI">
    //         <button id="AIbutton" onClick={AIOn}>
    //           Turn AI On
    //         </button>
    //         <div class="AI-Suggestions" id="AISuggestions">
    //           <p>test</p>
    //         </div>
    //       </div>

    //       <input
    //         type="text"
    //         class="content"
    //         id="textBox"
    //         placeholder="Type something..."
    //       />
    //     </div>
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
