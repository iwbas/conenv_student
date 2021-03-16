import logo from "./logo.svg";
import "./App.css";
import ManagmentPanel from "./components/ManagmentPanel";
import Editor from "./components/Editor";
import { useState } from "react";

function App() {
  // const [ code ] = useState()

  return (
    <>
      <ManagmentPanel />
      <Editor />
    </>
  );
}

export default App;
