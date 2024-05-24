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
      style={{
        backgroundColor: color,
        width: 22,
        height: 22,
        borderRadius: 11,
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'center'
      }}
      className="mt-5 flex items-center"
      onClick={onClick}
    >
      <span className="text-white text-sm font-bold">{title}</span>
    </div>
  )
}

export default Avatar
