import React, {useState} from "react";

const Tag = ({tagLabel, onClick, isSet}) => {
    
    const setClasses="bg-off-blue text-off-white  border-off-white"
    const unsetClasses="bg-off-white text-off-blue border-off-blue"
  return <button onClick={onClick} className={`rounded-full border-2 p-2 pt-1 pb-1 m-2 ${isSet ? setClasses : unsetClasses}`}>
  {tagLabel}
</button>;
};

export default Tag;