import React from "react";
import UserProfile from "./User";
import { useAtom } from "jotai";
import { userDataAtom } from "../data/atoms";
import Header from "./Header";
const Layout = ({ children }) => {
  const [user, setUser] = useAtom(userDataAtom);
  return (
    <div>
      {user && (
        <header>
          {/* <Header /> */}
          <UserProfile />
        </header>
      )}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
