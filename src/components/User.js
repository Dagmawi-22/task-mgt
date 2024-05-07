import { useAtom } from "jotai";
import React from "react";
import { userDataAtom } from "../data/atoms";

const UserProfile = () => {
  const [user, setUser] = useAtom(userDataAtom);
  return (
    <div className="fixed top-10 right-0 flex items-center mb-20 bg-blue-50 p-15 rounded-l-lg">
      <div className="mr-2">
        <img
          src={user?.picture}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
      <div className="mr-2 text-black">
        {user?.given_name + " " + user?.family_name}
      </div>
      <button
        onClick={() => setUser(null)}
        className="border border-black rounded px-2 py-1 cursor-pointer"
      >
        <span className="text-black">&rarr;</span>
      </button>
    </div>
  );
};

export default UserProfile;
