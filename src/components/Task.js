import React from "react";
import Avatar from "./Avatar";

const Task = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(246, 246, 242, 0.5)",
        marginLeft: "5%",
        width: "90%",
        minHeight: 70,
        maxHeight: 100,
        marginBottom: 7,
        borderRadius: 7,
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2)",
        position: "relative",
      }}
    >
      <span style={{ color: "#000", fontSize: 14, textAlign: "left" }}>
        {data.title}
      </span>
      <Avatar title={"AB"} />
    </div>
  );
};

export default Task;
