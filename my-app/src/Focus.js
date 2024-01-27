import './Focus.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NaviBar';
import About from './About';
import Features from './Features';
import Contact from './Contact';
import Focus from './Focus';

function Focus() {
    return (
        <div className = "Focus">
            <div className = "Focus-Title">
                <h2>
                Morning Team Meeting
                </h2>
                <div className = "date">
                <h3>
                    Date
                </h3>
                <p className="date-info">
                    <input type="text" class="hidden" id="textBox" placeholder="27/01/24"/>
                </p>
                </div>
            </div>

            <div className="tags">
                <ul>
                <li className="attributed">
                    Team
                </li>
                <li className="attributed"> 
                    Meeting
                </li>
                </ul>
            </div>

            <div className="AI suggestions">
                <button id="AIbutton" onclick="AIOn()">Turn AI On</button>
                <div id = 'AISuggestions'>
                    <ul>
                        <li className="unattributed">
                            Team
                        </li>
                        <li className="unattributed"> 
                            Meeting
                        </li>
                    </ul>
                </div>
            </div>

            <div className="content">
                <input type="text" class="hidden" id="textBox" placeholder="Type something..."/>
            </div>
        </div>
        
    );
}

function AIOn() {
    var AItags = document.getElementById('AISuggestions');
    AItags.style.display = (AItags.style.display === 'none' || AItags.style.display === '') ? 'block' : 'none';
}


export default Focus;