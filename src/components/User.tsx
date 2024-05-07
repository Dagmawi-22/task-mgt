import React from 'react'
import { useAtom } from 'jotai'
import { userDataAtom } from '../data/atoms'

const UserProfile = () => {
  const [user, setUser] = useAtom(userDataAtom)

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-gray-500 p-4 text-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-4">Welcome {user?.given_name}</h1>
        <img
          src={user?.picture}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
      <div className="flex items-center">
        <div className="mr-4">{user?.family_name}</div>
        <button
          onClick={() => setUser(null)}
          className="border border-white rounded px-2 py-1 cursor-pointer"
        >
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  )
}

export default UserProfile
