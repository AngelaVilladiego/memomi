import React, { useState, useEffect } from "react";
import MemoHeader from "./MemoHeader";
import "./Memo.css";
import TechretaryButton from "../TechretaryButton/TechretaryButton";
import MemoFooter from "./MemoFooter";
import Editable from "../Editable/Editable";
import sanitizeHtml from "sanitize-html";
import {
  GetMemo,
  GetUserMemos,
  GetUserFirstMemo,
  GetUserMemoIds,
  GetNewMemoSuggestions,
} from "../../services/endpoints";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    return( 
        <div className="rounded-lg ml-10 mr-10 border-2 border-memoblue-400 w-full flex-row content-between justify-between">
            <input className="text-sans text-memoblue-400" type="text" placeholder="File for a memo.." />
            <img ref=".../public/Search.png"/>
        </div>
    );
};

export default SearchBar;
