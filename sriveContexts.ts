import { createContext, MouseEventHandler } from 'react'

export const TracksContext = createContext({} as {
  tracks: {
    'singles': any,
    'albums': any,
    'artist': any,
    'playlistId': string,
  }
  getTracks: MouseEventHandler<HTMLParagraphElement>
})

export const PlayListIdContext = createContext({} as {
  playListId: string
})
