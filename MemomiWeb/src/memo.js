import React from 'react';
import { Link } from 'react-router-dom';
import './memo.css';

const TabNavi = () => {
  return (
    <nav>
      <ul>
        <li className="Agenda">
          <Link to="/Agenda">
            <img src="../public/Agenda_binder.png" alt="Logo" />
          </Link>
        </li>
        <li className="Inbox">
          <Link to="/Inbox">
            <img src="../public/Inbox_binder.png" alt="Logo" />
          </Link>
        </li>
        <li className="Memo">
          <Link to="/Memo">
            <img src="../public/Memo_binder.png" alt="Logo" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo;