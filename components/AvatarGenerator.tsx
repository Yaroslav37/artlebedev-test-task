import React, { useRef } from 'react'
import { toPng } from 'html-to-image'
import '../styles/AvatarGenerator.css'

const components = {
  backgrounds: ['boom.svg', 'bricks.svg', 'solid.svg'],
  bodies: [
    'muscle_shirt.svg',
    'necklace.svg',
    'plain.svg',
    'print.svg',
    'super_hero.svg',
    'sweater.svg',
  ],
  eyebrows: [
    'angry.svg',
    'formed.svg',
    'round.svg',
    'thick.svg',
    'thin.svg',
    'unsure.svg',
  ],
  eyes: ['lashes.svg', 'nice.svg', 'normal.svg', 'original.svg', 'tired.svg'],
  glasses: ['plain.svg', 'reading.svg', 'sunnies.svg'],
  head: ['head.svg'],
  mouths: [
    'beard.svg',
    'beard2.svg',
    'line.svg',
    'lips.svg',
    'open_smile.svg',
    'original.svg',
    'smile.svg',
  ],
  pets: ['cat.svg', 'dog.svg', 'fish.svg', 'raptor.svg'],
  tops: [
    'bun.svg',
    'cap.svg',
    'crazy.svg',
    'curly.svg',
    'long.svg',
    'mohawk.svg',
    'mullet.svg',
    'ninja.svg',
    'ponytail.svg',
    'smooth.svg',
    'styled.svg',
  ],
}

const getRandomComponent = (type: keyof typeof components) => {
  const items = components[type]
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

const AvatarGenerator = () => {
  const avatarRef = useRef<HTMLDivElement>(null)

  const generateAvatar = () => {
    if (avatarRef.current) {
      toPng(avatarRef.current, { width: 440, height: 440 })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'avatar.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.error('Ошибка генерации аватара', err)
        })
    }
  }

  return (
    <div>
      <div ref={avatarRef} className="avatar-container">
        <img
          src={`/src/files/backgrounds/${getRandomComponent('backgrounds')}`}
          className="avatar-component"
          style={{ top: '0px' }}
          alt="background"
        />
        <img
          src={`/src/files/bodies/${getRandomComponent('bodies')}`}
          className="avatar-component"
          style={{ top: '297px' }}
          alt="body"
        />
        <img
          src={`/src/files/head/${getRandomComponent('head')}`}
          className="avatar-component"
          style={{ top: '48px' }}
          alt="head"
        />
        <img
          src={`/src/files/eyes/${getRandomComponent('eyes')}`}
          className="avatar-component"
          style={{ top: '200px' }}
          alt="eyes"
        />
        <img
          src={`/src/files/eyebrows/${getRandomComponent('eyebrows')}`}
          className="avatar-component"
          style={{ top: '176px' }}
          alt="eyes"
        />
        <img
          src={`/src/files/mouths/${getRandomComponent('mouths')}`}
          className="avatar-component"
          style={{ top: '275px' }}
          alt="mouth"
        />
        <img
          src={`/src/files/tops/${getRandomComponent('tops')}`}
          className="avatar-component"
          style={{ top: '58px' }}
          alt="top"
        />
        <img
          src={`/src/files/glasses/${getRandomComponent('glasses')}`}
          className="avatar-component"
          style={{ top: '194px' }}
          alt="glasses"
        />
        <img
          src={`/src/files/pets/${getRandomComponent('pets')}`}
          className="avatar-component"
          style={{ top: '350px' }}
          alt="pet"
        />
      </div>
      <button onClick={generateAvatar}>Сгенерировать аватарку</button>
    </div>
  )
}

export default AvatarGenerator
