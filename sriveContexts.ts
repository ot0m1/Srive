import { createContext, MouseEventHandler } from 'react'

export const TracksContext = createContext({} as {
  tracks: {
    'singles': any,
    'albums': any,
    'artist': any,
  }
  getTracks: MouseEventHandler<HTMLParagraphElement>
})

export const PlayListIdContext = createContext({} as {
  playListId: string
})

export const CurrentArtistIdContext = createContext({} as {
  currentArtistId: string
})
