/*function isSelected(tag){
  var selected = document.getElementById(tag);
  if(suggestedTags.includes(tag)){
    selected.style.display = 'none';
    suggestedTags.pop(tag);
  }
  if (!tagss.includes(tag)){
    tagss[tagss.length] = tag;
    //need to add somethng that can bring it to the json
  }
  return(
    <div>
      <TagSet tagss = {tagss}/>
      <TagUnset tagss = {tagss} suggestedTags = {suggestedTags}/>
    </div>
  );
}*/

import React, {useState, useEffect} from "react";
import Tag from "./Tag/Tag";

const TagDisplay = () => {
    const [tags, setTags] = useState({setTags: ["#tag1", "tag2", "tag3"], suggestedTags:["#suggestedtag1", "suggestedtag2", "suggestedtag3"]});


    const unsetTag = () => {
        console.log("unset");
    };

    const setTag = (tagLabel) => {
        console.log("setting", tagLabel);
        let previousTagState = {...tags};
        let newSetTags = previousTagState["setTags"]
        newSetTags[newSetTags.length] = tagLabel;

        let newSuggestedTags = previousTagState["suggestedTags"].filter( e => e !== tagLabel );
        let newTags = {setTags: newSetTags, suggestedTags: newSuggestedTags};
        setTags({setTags: newSetTags, suggestedTags: newSuggestedTags});

    }

    return <div>
            <div>
            {tags["setTags"].map((tagLabel, index) => (
                <Tag key={tagLabel} onClick={unsetTag} tagLabel={tagLabel} isSet={tags["setTags"].indexOf(tagLabel) != -1} />
            ))}
            </div>
            <br/>
            <div>
            {tags["suggestedTags"].map((tagLabel, index) => (
                <Tag key={tagLabel} onClick={() => setTag(tagLabel)} tagLabel={tagLabel} isSet={tags["setTags"].indexOf(tagLabel) != -1} />
            ))}
            </div>
        </div>
    ;

}

export default TagDisplay;