import { createContext, MouseEventHandler } from 'react'

export const TracksContext = createContext({} as {
  tracks: {
    'singles': [],
    'albums': [],
    'artist': [],
  }
  getTracks: MouseEventHandler<HTMLParagraphElement>
})
