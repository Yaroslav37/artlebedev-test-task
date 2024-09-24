import React, { useState, useEffect, useRef } from 'react'
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
    // 'line.svg',
    // 'lips.svg',
    // 'open_smile.svg',
    // 'original.svg',
    // 'smile.svg',
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

  // Храним сгенерированные компоненты в состоянии
  const [avatarComponents, setAvatarComponents] = useState({
    background: '',
    head: '',
    eyebrows: '',
    body: '',
    glasses: '',
    mouth: '',
    top: '',
    eyes: '',
    pet: '',
  })

  useEffect(() => {
    // Генерируем компоненты при первой загрузке
    setAvatarComponents({
      background: getRandomComponent('backgrounds'),
      head: getRandomComponent('head'),
      eyebrows: getRandomComponent('eyebrows'),
      body: getRandomComponent('bodies'),
      glasses: getRandomComponent('glasses'),
      mouth: getRandomComponent('mouths'),
      top: getRandomComponent('tops'),
      eyes: getRandomComponent('eyes'),
      pet: getRandomComponent('pets'),
    })
  }, [])

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

  const getMouthPosition = (mouth: string) => {
    if (mouth === 'beard2.svg') {
      return '185px' // Меньше значение для beard2
    }
    return '225px' // Обычное значение для других
  }

  return (
    <div>
      <div ref={avatarRef} className="avatar-container">
        <img
          src={`/src/files/backgrounds/${avatarComponents.background}`}
          className="avatar-component"
          style={{ top: '0px' }}
          alt="background"
        />
        <img
          src={`/src/files/head/${avatarComponents.head}`}
          className="avatar-component"
          style={{ top: '132px' }}
          alt="head"
        />
        <img
          src={`/src/files/eyebrows/${avatarComponents.eyebrows}`}
          className="avatar-component"
          style={{ top: '176px' }}
          alt="eyebrows"
        />
        <img
          src={`/src/files/bodies/${avatarComponents.body}`}
          className="avatar-component"
          style={{ top: '297px' }}
          alt="body"
        />
        <img
          src={`/src/files/mouths/${avatarComponents.mouth}`}
          className="avatar-component"
          style={{ top: getMouthPosition(avatarComponents.mouth) }}
          alt="mouth"
        />
        <img
          src={`/src/files/glasses/${avatarComponents.glasses}`}
          className="avatar-component"
          style={{ top: '194px' }}
          alt="glasses"
        />
        <img
          src={`/src/files/tops/${avatarComponents.top}`}
          className="avatar-component"
          style={{ top: '58px' }}
          alt="top"
        />
        <img
          src={`/src/files/eyes/${avatarComponents.eyes}`}
          className="avatar-component"
          style={{ top: '200px' }}
          alt="eyes"
        />
        <img
          src={`/src/files/pets/${avatarComponents.pet}`}
          className="pet-component"
          alt="pet"
          style={{ top: '312px' }}
        />
      </div>
      <button onClick={generateAvatar}>Сгенерировать аватарку</button>
    </div>
  )
}

export default AvatarGenerator
