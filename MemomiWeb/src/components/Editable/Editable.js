import React, { useCallback, useEffect, createRef } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import "./Editable.css";

const Editable = ({ content, className, onSetContent, isEditable }) => {
  const contentRef = useRef(null);

  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  const onContentChange = React.useCallback((evt) => {
    onSetContent(evt.currentTarget.innerHTML);
  }, []);

  useEffect(() => {
    modifyQueries();
  }, []);

  const modifyQueries = () => {
    console.log("querying");
    document.querySelectorAll(".linkToMemo").forEach((linkToMemo) => {
      console.log(linkToMemo);
      var id = linkToMemo.getAttribute("data-id");
      linkToMemo.innerHTML = "AAAAAAAH";
      console.log(id);
      linkToMemo.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("hi from: ", id);
        document.execComm;
      });
      console.log("attached");
    });
  };

  return (
    <ContentEditable
      innerRef={contentRef}
      disabled={!isEditable}
      className={className}
      onBlur={onContentChange}
      html={content}
    />
  );
};
export default Editable;
