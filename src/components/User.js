import { useAtom } from "jotai";
import React from "react";
import { userDataAtom } from "../data/atoms";

const UserProfile = () => {
  const [user, setUser] = useAtom(userDataAtom);
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <img
          src={user?.picture}
          alt="Avatar"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
      <div style={{ marginRight: "10px", color: "#fff" }}>
        {user?.given_name + " " + user?.family_name}
      </div>
      <button
        onClick={() => setUser(null)}
        style={{
          backgroundColor: "transparent",
          border: "1px solid #fff",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#fff" }}>&rarr;</span>
      </button>
    </div>
  );
};

export default UserProfile;
