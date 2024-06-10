import React from "react";
import Chatbox from "./Chatbox";
import ChatBot from "./ChatBot";

function Grid() {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col mx-5">
            <Chatbox />
          </div>
          <div className="col">
            <ChatBot />
          </div>
        </div>
      </div>
    </>
  );
}

export default Grid;
