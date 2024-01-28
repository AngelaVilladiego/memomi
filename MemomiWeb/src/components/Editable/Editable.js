import React, { useCallback, useEffect, createRef } from "react";
import "./Editable.css";

const Editable = ({
  content,
  className,
  onSetContent,
  isEditable,
  onClickLink,
}) => {
  const insertLink = (content) => {
    var myHtmlString = content;
    var htmlDom = new DOMParser().parseFromString(myHtmlString, "text/html");
    htmlDom.body.querySelectorAll(".linkToMemo").forEach((iHtml) => {
      if (iHtml.innerHtml == iHtml.innerText) {
        iHtml.innerHTML = iHtml.innerText + '<i class="iconLink"></i>';
      }
    });
    return content;
  };

  const onContentBlur = React.useCallback((evt) => {
    onSetContent(evt.currentTarget.innerHTML);
  }, []);

  const clickHandler = (e) => {
    const el = e.target.closest(".linkToMemo");
    if (el && e.currentTarget.contains(el)) {
      onClickLink(el.getAttribute("data-id"));
    }
  };

  return isEditable ? (
    <div
      onClick={clickHandler}
      onBlur={onContentBlur}
      contentEditable
      className={className}
      dangerouslySetInnerHTML={{ __html: insertLink(content) }}
    ></div>
  ) : (
    <div
      onClick={clickHandler}
      className={className}
      dangerouslySetInnerHTML={{ __html: insertLink(content) }}
    ></div>
  );
};
export default Editable;
