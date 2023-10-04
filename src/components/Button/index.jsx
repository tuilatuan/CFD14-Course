import React from "react";
import { Link } from "react-router-dom";

const Button = ({ variant = "primary", link, className, children, ...rest }) => {
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "btn btn--primary";
      break;
    case "border":
      variantClass = "btn btn--border --black";
      break;
    case "grey":
      variantClass = "btn btn--grey";
      break;

    default:
      break;
  }
  if (!!link) {
    return (
      <Link to={link} className={`${variantClass} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
