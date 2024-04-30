import React from "react";
import UserProfile from "./User";
const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <UserProfile />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
