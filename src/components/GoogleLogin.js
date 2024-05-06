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
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50"></div>
      <div className="flex justify-center items-center h-screen z-50">
        <button onClick={() => googleLogin()} className="google-login-btn">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Icon"
            width={40}
            height={40}
            className="mr-2"
          />
          Continue with Google
        </button>
      </div>
    </>
  );
}
