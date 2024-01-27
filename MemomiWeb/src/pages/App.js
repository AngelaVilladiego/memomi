import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import About from "./AboutPage/About";
import Features from "./Features";
import Contact from "./Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <NaviBar />
        <Routes>
          <Route path="/" exact component={App} />
          <Route path="/about" component={About} />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>
      <div className="memo-focus">
        <div className="Desktop-memo">
          <h2>My Memos</h2>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            varius leo tellus, vel ullamcorper risus semper eu. Morbi molestie,
            massa.
          </h3>
          <hr></hr>
          <div>
            <div>
              <p className="type">Memos</p>
              <p>26</p>
            </div>
            <div>
              <p className="type">Owner</p>
              <p>Jane Doe</p>
            </div>
            <div>
              <p className="type">Theme</p>
              <p>Ivory</p>
            </div>
            <div>
              <p className="type">AI suggestions</p>
              <p>On</p>
            </div>
          </div>
          <hr></hr>
          <p>PLACEHOLDER SEARCH BAR</p>
          <table className="MemosAll">
            <th colspan="3">Title</th>
            <th>Date</th>
            <tr>
              <td>Morning Team Meeting</td>
              <td>Jan 27 2024</td>
            </tr>
            <tr>
              <td>To-Do List</td>
              <td>Jan 27 2024</td>
            </tr>
          </table>
        </div>
        <div className="Focus-memo"></div>
      </div>
    </div>
  );
}

export default App;
