import { ReactNodeViewRenderer } from "@tiptap/react";
import React from "react";
import "./Draggable.scss";

import { Node } from "@tiptap/core";
// import ReactComponent from "../Component/Extension";

const Draggable = () => {
  return (
    <div className="draggable-item">
      <div
        className="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      ></div>
    </div>
  );
};

export default Draggable;
