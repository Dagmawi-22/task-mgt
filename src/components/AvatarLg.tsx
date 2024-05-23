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
      className="flex justify-center items-center rounded-full"
      style={{ backgroundColor: color, width: 46, height: 46 }}
      onClick={onClick}
    >
      <span className="text-white text-[28px] font-bold">{title}</span>
    </div>
  )
}

export default AvatarLg
