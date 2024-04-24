import React from "react";
import Divider from "./Divider";
import Task from "./Task";

const Board = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "gray",
        minWidth: 350,
        minHeight: 400,
        maxHeight: 600,
        borderRadius: 15,
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span style={{ color: "#000", fontSize: 18 }}>{data.title}</span>
      <Divider />
      {data?.tasks.map((item, index) => (
        <Task key={index} data={item} />
      ))}
    </div>
  );
};

export default Board;
