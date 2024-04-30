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
      <div className="overlay"></div>
      <div className="login-container">
        <button onClick={() => googleLogin()} className="google-login-btn">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Icon"
            width={40}
            height={40}
          />
          Continue with Google
        </button>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(
            0,
            0,
            0,
            0.4
          ); /* Black background with 50% opacity */
          z-index: 999;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          height: 100vh;
          z-index: 1000;
        }

        .google-login-btn {
          background-color: #fff;
          color: #000;
          padding: 15px 25px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -40px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.7);
        }

        .google-login-btn img {
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}
