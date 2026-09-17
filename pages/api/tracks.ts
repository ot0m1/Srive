import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllPages, pagedUrl } from '../../lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  const [singles, albums, appearsOnAndCompilation] = await Promise.all([
    getAlbums(body.token, body.id, 'single'),
    getAlbums(body.token, body.id, 'album'),
    getAlbums(body.token, body.id, 'appears_on,compilation'),
  ])

  const failed = [singles, albums, appearsOnAndCompilation].find((group) => group.status !== 200)

  if (failed) {
    res.status(failed.status).json({ data: null })
    return
  }

  const result = {
    'singles': { items: singles.items },
    'albums': { items: albums.items },
    'appearsOnAndCompilation': { items: appearsOnAndCompilation.items },
  }

  res.status(200).json({ data: result })
}

async function getAlbums(token: string, id: string, groups: string = 'album,single') {
  const url = pagedUrl(`/artists/${id}/albums`, { 'include_groups': groups })
  const { status, items } = await fetchAllPages<any>(url, token)

  return { status, items: dedupeReleases(items) }
}

/**
 * The same release is listed once per market it was published in, each time
 * under a different album id. Without this, paging turns a prolific artist's
 * playlist into the same songs over and over.
 */
function dedupeReleases(albums: any[]) {
  const seen = new Set<string>()

  return albums.filter((album) => {
    const key = [
      album?.artists?.[0]?.id,
      String(album?.name).toLowerCase(),
      album?.release_date,
      album?.total_tracks,
    ].join('|')

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}
