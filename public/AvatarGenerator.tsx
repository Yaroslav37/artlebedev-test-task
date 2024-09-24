import React, { useState, useEffect, useRef } from 'react'
import { toPng } from 'html-to-image'
import '../styles/AvatarGenerator.css'

const components = {
  backgrounds: ['boom.svg', 'bricks.svg', 'solid'],
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

const solidColors = ['#76EBC8', '#985CFA', '#FC8F8F']

const getRandomComponent = (type: keyof typeof components) => {
  const items = components[type]
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * solidColors.length)
  return solidColors[randomIndex]
}

const AvatarGenerator = () => {
  const avatarRef = useRef<HTMLDivElement>(null)

  // Храним сгенерированные компоненты в состоянии
  const [avatarComponents, setAvatarComponents] = useState({
    background: '',
    backgroundColor: '',
    head: '',
    eyebrows: '',
    body: '',
    glasses: '',
    mouth: '',
    top: '',
    eyes: '',
    pet: '',
  })

  const generateRandomAvatar = () => {
    const background = getRandomComponent('backgrounds')
    setAvatarComponents({
      background,
      backgroundColor: background === 'solid' ? getRandomColor() : '',
      head: getRandomComponent('head'),
      eyebrows: getRandomComponent('eyebrows'),
      body: getRandomComponent('bodies'),
      glasses: getRandomComponent('glasses'),
      mouth: getRandomComponent('mouths'),
      top: getRandomComponent('tops'),
      eyes: getRandomComponent('eyes'),
      pet: getRandomComponent('pets'),
    })
  }

  useEffect(() => {
    generateRandomAvatar()
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
    <div className="avatar-wrapper">
      <div ref={avatarRef} className="avatar-container">
        {avatarComponents.background === 'solid' ? (
          <div
            className="avatar-component"
            style={{
              top: '0px',
              backgroundColor: avatarComponents.backgroundColor,
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <img
            src={`/backgrounds/${avatarComponents.background}`}
            className="avatar-component"
            style={{ top: '0px' }}
            alt="background"
          />
        )}
        <img
          src={`/head/${avatarComponents.head}`}
          className="avatar-component"
          style={{ top: '132px' }}
          alt="head"
        />
        <img
          src={`/eyebrows/${avatarComponents.eyebrows}`}
          className="avatar-component"
          style={{ top: '176px' }}
          alt="eyebrows"
        />
        <img
          src={`/bodies/${avatarComponents.body}`}
          className="avatar-component"
          style={{ top: '297px' }}
          alt="body"
        />
        <img
          src={`/mouths/${avatarComponents.mouth}`}
          className="avatar-component"
          style={{ top: getMouthPosition(avatarComponents.mouth) }}
          alt="mouth"
        />
        <img
          src={`/glasses/${avatarComponents.glasses}`}
          className="avatar-component"
          style={{ top: '194px' }}
          alt="glasses"
        />
        <img
          src={`/tops/${avatarComponents.top}`}
          className="avatar-component"
          style={{ top: '62px' }}
          alt="top"
        />
        <img
          src={`/eyes/${avatarComponents.eyes}`}
          className="avatar-component"
          style={{ top: '200px' }}
          alt="eyes"
        />
        <img
          src={`/pets/${avatarComponents.pet}`}
          className="pet-component"
          alt="pet"
          style={{ top: '312px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ borderRadius: '0' }} onClick={generateAvatar}>
          Скачать аватарку
        </button>
        <button style={{ borderRadius: '0' }} onClick={generateRandomAvatar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AvatarGenerator
