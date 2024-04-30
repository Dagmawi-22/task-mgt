import React from "react";

const UserProfile = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <img
          src={"user"}
          alt="Avatar"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
      <div style={{ marginRight: "10px", color: "#333" }}>{"user.name"}</div>
      <button
        onClick={() => {}}
        style={{
          backgroundColor: "transparent",
          border: "1px solid #333",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
