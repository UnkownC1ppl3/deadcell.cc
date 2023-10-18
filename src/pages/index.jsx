import clsx from 'clsx'
import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faArtstation,
  faBehance,
  faSteam,
  faYoutube,
  faDeviantart,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const videoRef = useRef(null)

  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [hoveredIcon, setHoveredIcon] = useState(null)

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      video.volume = 0.4

      // play() returns a promise which gets rejected if there is an autoplay policy
      // in place, which is enabled by default in pretty much every browser, one
      // exception is if the video is muted beforehand
      video.play().catch(() => {
        video.muted = true

        video.play().then(() => {
          setMuted(true)

          // for some reason brave doesn't require user interaction for you
          // to call play() and unmute the video programmatically, so what we're
          // doing here is effectively "autoplaying" the video with sound
          navigator.brave?.isBrave().then(() => {
            video.muted = false
            setMuted(false)
          })
        })
      })
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      const duration = video.duration
      setDuration(duration)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      const updateTime = () => {
        const currentTime = video.currentTime
        setCurrentTime(currentTime)
      }

      videoRef.current.addEventListener('timeupdate', updateTime)

      return () => {
        video.removeEventListener('timeupdate', updateTime)
      }
    }
  }, [])

  const unmute = useCallback(() => {
    if (!muted) {
      return
    }

    const video = videoRef.current

    if (video) {
      video.muted = false
      setMuted(false)
    }
  }, [muted])

  const convertTimeToTimestamp = (time) => {
    try {
      const date = new Date(null)
      date.setSeconds(time)
      return date.toISOString().substr(15, 4) // Extracts the time part in HH:mm:ss format
    } catch (err) {}
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime
      const currentTimeInRealTime = convertTimeToTimestamp(
        currentTime.toFixed(0),
      )
    }
  }

  const handleIconMouseEnter = (event, icon) => {
    setHoveredIcon(icon)
  }

  const handleIconMouseLeave = () => {
    setHoveredIcon(null)
  }

  return (
    <>
      <Head>
        <title>DEADCELL</title>
        <meta name="description" content="" />
      </Head>

      <div className="absolute z-50 h-2 w-full bg-black/25 shadow-xl backdrop-blur">
        <div
          className="absolute h-2 bg-[#C07A89] shadow-xl"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="relative flex h-screen items-center justify-center text-xl lg:text-base">
        {muted && (
          <>
            <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
              <span className="font-mono font-medium text-white [text-shadow:_1px_2px_6px_rgb(0_0_0_/_100%)]">
                「 click to unmute 」
              </span>
            </div>
          </>
        )}

        <div className="-translate-y-1/3[-14px] absolute left-1/2 top-1/3 z-50 mt-4 -translate-x-1/2 rounded bg-slate-500/50 px-4 py-3.5 shadow-xl backdrop-blur">
          <div
            className="grid grid-cols-4 gap-4 text-white lg:text-lg"
            style={{ 'user-select': 'none' }}
          >
            <div
              className="transition-colors ease-in hover:text-[#C07A89]"
              onMouseEnter={(event) => handleIconMouseEnter(event, 'GitHub')}
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://github.com/EternityX">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#1DA1F2]"
              onMouseEnter={(event) => handleIconMouseEnter(event, '@9Syl')}
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://twitter.com/9Syl">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#5865F2]"
              style={{ cursor: 'pointer' }}
              onMouseEnter={(event) =>
                handleIconMouseEnter(event, 'jeramiedavis')
              }
              onMouseLeave={handleIconMouseLeave}
            >
              <FontAwesomeIcon icon={faDiscord} />
            </div>
            <div
              onMouseEnter={(event) =>
                handleIconMouseEnter(event, 'jeramie@pm.me')
              }
              onMouseLeave={handleIconMouseLeave}
            >
              <a
                className="transition-colors ease-in hover:text-[#C07A89]"
                href="mailto:jeramie@pm.me"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#00E59B]"
              onMouseEnter={(event) =>
                handleIconMouseEnter(event, 'DeviantArt')
              }
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://www.deviantart.com/mybrainisdamaged">
                <FontAwesomeIcon icon={faDeviantart} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#0073B2]"
              onMouseEnter={(event) => handleIconMouseEnter(event, 'LinkedIn')}
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://www.linkedin.com/in/jeramiedavis/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#13AFF0]"
              onMouseEnter={(event) =>
                handleIconMouseEnter(event, 'ArtStation')
              }
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://www.artstation.com/jeramiedavis">
                <FontAwesomeIcon icon={faArtstation} />
              </a>
            </div>
            <div
              className="transition-colors ease-in hover:text-[#0057FF]"
              onMouseEnter={(event) => handleIconMouseEnter(event, 'Behance')}
              onMouseLeave={handleIconMouseLeave}
            >
              <a href="https://www.behance.net/jeramie-davis">
                <FontAwesomeIcon icon={faBehance} />
              </a>
            </div>
          </div>
        </div>

        {hoveredIcon && (
          <>
            <div className="pointer-events-none absolute left-1/2 top-1/3 mt-36 -translate-x-1/2 -translate-y-1/2 pb-6">
              <span className="font-mono font-medium text-white [text-shadow:_1px_2px_6px_rgb(0_0_0_/_100%)]">
                {hoveredIcon}
              </span>
            </div>
          </>
        )}

        <div className="pointer-events-none absolute left-1/2 top-0 mt-6 -translate-x-1/2 -translate-y-1/3">
          <span className="font-mono text-white [text-shadow:_1px_2px_6px_rgb(0_0_0_/_100%)]">
            {convertTimeToTimestamp(currentTime.toFixed(0)) +
              ' / 5:32'}
          </span>
        </div>

        <div
          onClick={(e) => muted && e.preventDefault()}
          className="h-full w-full"
        >
          <video
            ref={videoRef}
            id="video"
            autoPlay={true}
            loop={true}
            onClick={() => unmute()}
            onTimeUpdate={handleTimeUpdate()}
            className={clsx('h-full w-full object-cover')}
          >
            <source src="/video/desolate.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  )
}
