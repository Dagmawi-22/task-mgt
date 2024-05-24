import React, { useEffect, useRef } from 'react'

const ClickAwayListener = ({ children, onClickAway }) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickAway])

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  )
}

export default ClickAwayListener
