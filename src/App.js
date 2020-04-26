import React from "react";
import "./App.css";
import PropTypes from "prop-types";

function App(props) {
  const { children } = props;
  return <div className="App">{children}</div>;
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
