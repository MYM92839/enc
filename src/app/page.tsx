'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Size {
  width: number | undefined
  height: number | undefined
}

// Hook
function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
type gridColumnsType = {
  [key: number]: string
}

const gridColumns: gridColumnsType = {
  0: 'min-h-[1218px]',
  1: 'min-h-screen',
}

export default function Home() {
  const size: Size = useWindowSize()
  const isMobile = size.width && size.width < 429
  return (
    <main>
      <div className={gridColumns[isMobile ? 0 : 1]}>
        <Image
          className={gridColumns[isMobile ? 0 : 1]}
          src={isMobile ? '/m_bg.png' : '/web_bg.png'}
          alt='background'
          fill
          priority
          style={{
            objectFit: 'cover',
          }}
        />
        <Image
          className={gridColumns[isMobile ? 0 : 1]}
          src={isMobile ? '/m_content.png' : '/web_content.png'}
          alt='content'
          fill
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    </main>
  )
}
