import React, { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import "./Editable.css";

const Editable = ({ content, className, onSetContent }) => {
  const formatDisplay = (content) => {
    return '<pre style="white-space:pre-wrap;">' + content + "</pre>";
  };

  const onContentChange = React.useCallback((evt) => {
    onSetContent(sanitizeHtml(evt.currentTarget.innerHTML));
  }, []);

  return (
    <ContentEditable
      className={className}
      onChange={onContentChange}
      onBlur={onContentChange}
      html={formatDisplay(content)}
    />
  );
};
export default Editable;
