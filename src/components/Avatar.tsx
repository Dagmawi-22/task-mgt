import { FC, useEffect, useState } from 'react'

type AvatarProps = {
  title: string
  onClick: any
}

const Avatar: FC<AvatarProps> = ({ title, onClick }) => {
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
      className={`bg-[${color}] w-6 h-6 rounded-full absolute bottom-1 right-1 flex justify-center items-center mt-5`}
      onClick={onClick}
    >
      <span className="text-white text-[11px] font-bold">{title}</span>
    </div>
  )
}

export default Avatar
