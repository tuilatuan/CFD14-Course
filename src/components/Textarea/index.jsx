import React from "react";

const Textarea = ({ error, ...rest }) => {
  return <textarea className={`form__input  ${error ? "formerror" : ""}`} {...rest} />;
};

export default Textarea;
