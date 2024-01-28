import React, { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import "./Editable.css";

const Editable = ({ content, className, onSetContent }) => {
  const onContentChange = React.useCallback((evt) => {
    onSetContent(evt.currentTarget.innerHTML);
  }, []);

  return (
    <ContentEditable
      className={className}
      onBlur={onContentChange}
      html={content}
    />
  );
};
export default Editable;
