import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import packageInfo from "../package.json";

console.log(packageInfo.version);

ReactDOM.render(<App />, document.getElementById("root"));
