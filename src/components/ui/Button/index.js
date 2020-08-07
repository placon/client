import React from "react";
import classNames from "classnames";
import "./index.scss";

function Button({ children, size, color, outline, fullWidth, ...rest }) {
  return (
    <button
      className={classNames("Button", size, color, { outline, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: "medium",
  color: "blue",
  outline: false,
  fullWidth: false,
};

export default Button;
