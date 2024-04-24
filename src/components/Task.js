import React from "react";

const Task = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#f6f6f2",
        marginLeft: "5%",
        width: "90%",
        minHeight: 70,
        maxHeight: 100,
        marginBottom: 7,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span style={{ color: "#000", fontSize: 18 }}>{data.title}</span>
    </div>
  );
};

export default Task;
