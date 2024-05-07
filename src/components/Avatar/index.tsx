import React, { FC } from 'react'

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

  const getRandomColor = () => {
    const randomIndex: number = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  const randomColor: string = getRandomColor()

  return (
    <div
      style={{
        backgroundColor: randomColor,
        width: 26,
        height: 26,
        borderRadius: 13,
        position: 'absolute',
        bottom: 5,
        right: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span style={{ color: '#fff', fontSize: 11 }}>{title}</span>
    </div>
  )
}

export default Avatar
