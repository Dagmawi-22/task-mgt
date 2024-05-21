import { FC, useEffect, useState } from 'react'

type AvatarProps = {
  title: string
}

const Avatar: FC<AvatarProps> = ({ title }) => {
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className="mt-5"
    >
      <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>
        {title}
      </span>
    </div>
  )
}

export default Avatar
