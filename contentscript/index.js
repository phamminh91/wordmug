import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Flashcard from "./Flashcard.jsx";

if (window.location.href.indexOf("chrome-extension") !== 0) {
  const rootNode = document.createElement("div");
  rootNode.id = "wordmug-root";
  document.body.appendChild(rootNode);

  ReactDOM.render(<Flashcard />, rootNode);
}
