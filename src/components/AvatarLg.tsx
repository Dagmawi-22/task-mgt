import React, { FC, MouseEventHandler } from 'react'

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

  const getRandomColor = () => {
    const randomIndex: number = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  const randomColor: string = getRandomColor()

  return (
    <div
      style={{
        backgroundColor: randomColor,
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
      <span style={{ color: '#fff', fontSize: 21 }}>{title}</span>
    </div>
  )
}

export default AvatarLg
