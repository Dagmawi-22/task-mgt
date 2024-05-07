import { useAtom } from 'jotai'
import React from 'react'
import { userDataAtom } from 'data/atoms'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

export default function LoginWithGoogle() {
  const [data, setUserData] = useAtom(userDataAtom)

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: any) => gLogin(codeResponse?.access_token)
  })

  const gLogin = async (access_token: string) => {
    try {
      const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
      const response = await axios.get(url)
      const userData = response.data
      console.log('ressss is', userData)
      setUserData(userData)
      localStorage.setItem('userData', JSON.stringify(userData))
    } catch (error) {
      console.log('Error logging in via Google:', error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={() => googleLogin()}
          className="flex items-center bg-white text-dark py-2 px-4 rounded shadow hover:bg-gray-800 hover:text-white"
        >
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
  )
}
