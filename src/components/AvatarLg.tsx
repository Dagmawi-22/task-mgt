import React, { FC, MouseEventHandler, useEffect, useState } from 'react'

type AvatarProps = {
  title: string
  onClick: MouseEventHandler<HTMLDivElement>
}

const AvatarLg: FC<AvatarProps> = ({ title, onClick }) => {
  const colors: string[] = [
    '#FF5733',
    '#FFBD33',
    '#33FF6E',
    '#339FFF',
    '#B533FF'
  ]

  const [color, setColor] = useState<string>('')

  const getRandomColor = () => {
    const randomIndex: number = Math.floor(Math.random() * colors.length)
    setColor(colors[randomIndex])
  }

  useEffect(() => {
    getRandomColor()
  }, [])

  return (
    <div
      style={{
        backgroundColor: color,
        width: 46,
        height: 46,
        borderRadius: 23,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={onClick}
      className="cursor-pointer shadow-md border border-2 border-white"
    >
      <span style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
        {title}
      </span>
    </div>
  )
}

export default AvatarLg
