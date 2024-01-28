import React from "react";

const SearchBar = () => {
  return( 
        <div className="rounded-lg ml-10 mr-10 mt-2 mb-2 w-full flex-row content-between justify-between">
            <input className="text-sans text-memoblue-400" type="text" placeholder="File for a memo.." />
            <img ref=".../public/Search.png"/>
        </div>
    );
};

export default SearchBar;
