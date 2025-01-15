import React, { useEffect, useState } from 'react'

const MobileNotice: React.FC = () => {

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const checkIfMobile = () => setIsMobile(window.innerWidth < 1300)
  
  useEffect(() => {
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (!isMobile) return null
  

  return (
    <div className="fixed inset-0 bg-gray-500 text-white text-2xl font-bold flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img
          src="/mobile.png"
          alt="No Mobile Icon"
          className="h-32 w-32 mb-4"
        />
        <div className="p-4 text-center">
          Mobile devices are not supported for this board. Please use a DESKTOP.
        </div>
      </div>
    </div>
  )
}

export default MobileNotice
