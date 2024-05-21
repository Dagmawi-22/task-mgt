import React, { FC, useState } from 'react'

type Props = {
  text: string
  children: React.ReactNode
}

const Tooltip: FC<Props> = ({ text, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
          {text ? text : 'Unassigned'}
        </div>
      )}
    </div>
  )
}

export default Tooltip
