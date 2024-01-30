import React, { useCallback, useEffect, createRef } from "react";
import "./Editable.css";

const Editable = ({
  content,
  className,
  onSetContent,
  isEditable,
  onClickLink,
  onClickSuggest,
}) => {
  const onContentBlur = React.useCallback((evt) => {
    onSetContent(evt.currentTarget.innerHTML);
  }, []);

  const clickHandler = (e) => {
    var el = e.target.closest(".linkToMemo");
    if (el && e.currentTarget.contains(el)) {
      onClickLink(el.getAttribute("data-id"));
    }
    el = e.target.closest(".suggest");
    if (el && e.currentTarget.contains(el)) {
      onClickSuggest(el.getAttribute("data-title"));
    }
  };

  return isEditable ? (
    <div
      onClick={clickHandler}
      onBlur={onContentBlur}
      contentEditable
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  ) : (
    <div
      onClick={clickHandler}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
export default Editable;
