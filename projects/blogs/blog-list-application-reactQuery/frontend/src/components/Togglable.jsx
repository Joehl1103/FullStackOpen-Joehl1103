import { useState } from "react";
import { Button } from '../styles/styledComponent.jsx'
import '../styles/general.css'

const Togglable = ({ buttonLabel, cancelLabel, children }) => {
  const [visible, setVisible] = useState(false);

  // if visible is true then set display to none
  const baseStyle = {
    padding: "0",
    margin: "0",
    marginLeft: "-5px"
  }
  const hideWhenVisible = {
     ...baseStyle,
     display: visible ? "none" : ""
  };
  // if visible is true then set display to yes
  const showWhenVisible = {
     ...baseStyle,
     display: visible ? "" : "none" 
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <Button
          data-testid="toggle-on-button"
          className="visible"
          onClick={toggleVisibility}
        > {buttonLabel}
        </Button>
      </div>
      <div className="details" style={showWhenVisible}>
        {children}
        <br />
        <Button className="hideDetails" onClick={toggleVisibility}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
