import type { NextApiRequest, NextApiResponse } from 'next'
import { Release, dedupeRecordings } from '../../lib/dedupe'
import {
  ALBUM_IDS_PER_REQUEST,
  PLAYLIST_TRACK_LIMIT,
  SPOTIFY_API,
  URIS_PER_REQUEST,
  chunk,
  fetchAllPages,
  mapWithConcurrency,
  spotifyFetch,
} from '../../lib/spotify'

const CONCURRENCY = 5

type Candidate = Release & { artists: any[] }

const EachTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const token = body.token
  const ids = body.ids
  const artistId = body.artistId
  const dedupe = body.dedupe !== false

  const [status, uris] = await getTrackId(token, ids, artistId, dedupe)

  res.status(status).json({ uris: uris })
}

const getTrackId = async (
  token: string,
  ids: string[],
  artistId: string,
  dedupe: boolean
): Promise<[number, string[][]]> => {
  const albumIds: string[] = Array.isArray(ids) ? ids : []

  const batches = await mapWithConcurrency(
    chunk(albumIds, ALBUM_IDS_PER_REQUEST),
    CONCURRENCY,
    (batch) => getAlbums(token, batch)
  )

  const failedBatch = batches.find((batch) => batch.status !== 200)
  if (failedBatch) {
    return [failedBatch.status, []]
  }

  const albums = batches.map((batch) => batch.albums).reduce((all, some) => all.concat(some), [])

  const trackLists = await mapWithConcurrency(albums, CONCURRENCY, (album) =>
    getAlbumTracks(token, album)
  )

  const failedTrackList = trackLists.find((trackList) => trackList.status !== 200)
  if (failedTrackList) {
    return [failedTrackList.status, []]
  }

  const tracks = trackLists
    .map((trackList) => trackList.tracks)
    .reduce((all, some) => all.concat(some), [] as Candidate[])

  const seen = new Set<string>()

  const candidates = tracks
    .filter((track) => track.artists.some((artist: any) => artist.id === artistId))
    .filter((track) => {
      if (!track.uri || seen.has(track.uri)) {
        return false
      }

      seen.add(track.uri)
      return true
    })

  const selected = dedupe ? dedupeRecordings(candidates) : candidates
  const uris = selected.map((track) => track.uri).slice(0, PLAYLIST_TRACK_LIMIT)

  return [200, chunk(uris, URIS_PER_REQUEST)]
}

const getAlbums = async (token: string, ids: string[]) => {
  const params = new URLSearchParams({ 'ids': ids.join(',') })
  const response = await spotifyFetch(`${SPOTIFY_API}/albums?${params}`, token)

  if (response.status !== 200) {
    return { status: response.status, albums: [] as any[] }
  }

  const data = await response.json()

  // Albums that are unavailable to the user come back as null entries.
  const albums = (data.albums || []).filter(Boolean)

  return { status: 200, albums }
}

/**
 * An album's `tracks` is itself a page of at most 50, so long compilations
 * need the rest of their tracks fetched separately.
 */
const getAlbumTracks = async (token: string, album: any) => {
  const items = album?.tracks?.items || []

  if (!album?.tracks?.next) {
    return { status: 200, tracks: withAlbum(items, album) }
  }

  const rest = await fetchAllPages<any>(album.tracks.next, token)

  return { status: rest.status, tracks: withAlbum(items.concat(rest.items), album) }
}

// An album track does not carry its album, but which release a recording came
// from is what decides which copy of it survives deduplication.
const withAlbum = (tracks: any[], album: any): Candidate[] =>
  tracks.map((track) => ({
    uri: track?.uri,
    name: track?.name,
    durationMs: track?.duration_ms,
    artists: track?.artists || [],
    albumType: album?.album_type,
    releaseDate: album?.release_date,
  }))

export default EachTrack
