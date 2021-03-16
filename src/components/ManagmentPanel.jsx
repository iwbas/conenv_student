import { useState } from "react";
import ExitForm from "./ExitForm";
import { CaretRight, DoorOpen, Tools, Save } from "react-bootstrap-icons";

import "./ManagmentPanel.css";

const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow, dialog, Menu } = remote;

function ManagmentPanel() {
  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const showOverlay = () => {
    console.log(isOverlayShown);
    setIsOverlayShown(true);
  };

  const hideOverlay = (event) => {
    if (event.target === event.currentTarget) setIsOverlayShown(false);
  };

  return (
    <>
      {isOverlayShown ? (
        <div className="overlay" onClick={hideOverlay}>
          <ExitForm />
        </div>
      ) : null}
      <div className="panel">
        <button>
          <Save />
        </button>
        <div className="buttons-wrapper">
          <button>
            <CaretRight />
          </button>
          <button>
            <Tools />
          </button>
        </div>
        <button onClick={showOverlay}>
          <DoorOpen />
        </button>
      </div>
    </>
  );
}

export default ManagmentPanel;
