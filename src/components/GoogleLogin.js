import { useAtom } from "jotai";
import React from "react";
import { userDataAtom } from "../data/atoms";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LoginWithGoogle() {
  const [data, setUserData] = useAtom(userDataAtom);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => gLogin(codeResponse?.access_token),
  });

  const gLogin = async (access_token) => {
    try {
      const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
      const response = await axios.get(url);
      const userData = response.data;
      console.log("ressss is", userData);
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.log("Error logging in via Google:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        height: "100vh",
      }}
    >
      <button
        onClick={() => googleLogin()}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "15px 25px",
          borderRadius: "5px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          width={40}
          height={40}
        />
        Continue with Google
      </button>
    </div>
  );
}
