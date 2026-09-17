export const SPOTIFY_API = 'https://api.spotify.com/v1'

// Hard limits imposed by the Spotify Web API.
export const ALBUM_IDS_PER_REQUEST = 20 // GET /albums?ids=
export const URIS_PER_REQUEST = 100 // POST /playlists/{id}/tracks
export const PLAYLIST_TRACK_LIMIT = 10000 // tracks a single playlist can hold

// `limit` is the size of one page, not a cap on the whole result set.
// Paging keeps going until `next` is null, so 50 here is not a ceiling.
const PAGE_SIZE = 50

// Spotify has been reported to hand back a `next` link forever, with an empty
// `items` array, so paging needs a hard stop of its own as well.
const MAX_PAGES = 40

const MAX_RETRIES = 3
const MAX_RETRY_WAIT_MS = 10000

type Page<T> = {
  items?: T[]
  next?: string | null
  total?: number
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isRetryable = (status: number) => status === 429 || status >= 500

const retryWaitMs = (response: Response, attempt: number) => {
  const retryAfter = Number(response.headers.get('Retry-After'))

  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Math.min(retryAfter * 1000, MAX_RETRY_WAIT_MS)
  }

  return Math.min(500 * Math.pow(2, attempt), MAX_RETRY_WAIT_MS)
}

/**
 * fetch() against the Spotify API that honours the Retry-After header on 429
 * and backs off on 5xx. Paging an artist with hundreds of releases makes
 * enough calls that rate limiting stops being a theoretical concern.
 */
export const spotifyFetch = async (url: string, token: string, init: RequestInit = {}) => {
  const options: RequestInit = {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  for (let attempt = 0; attempt < MAX_RETRIES && isRetryable(response.status); attempt++) {
    await sleep(retryWaitMs(response, attempt))
    response = await fetch(url, options)
  }

  return response
}

/**
 * Follows the `next` links of a paged endpoint and returns every item.
 */
export const fetchAllPages = async <T>(url: string, token: string) => {
  const items: T[] = []
  let nextUrl: string | null = url

  for (let page = 0; page < MAX_PAGES && nextUrl; page++) {
    const response = await spotifyFetch(nextUrl, token)

    if (response.status !== 200) {
      return { status: response.status, items }
    }

    const data: Page<T> = await response.json()

    if (!Array.isArray(data.items) || data.items.length === 0) {
      break
    }

    items.push(...data.items)
    nextUrl = data.next || null
  }

  return { status: 200, items }
}

export const pagedUrl = (path: string, params: Record<string, string>) => {
  const query = new URLSearchParams({ ...params, limit: String(PAGE_SIZE), offset: '0' })

  return `${SPOTIFY_API}${path}?${query}`
}

export const chunk = <T>(array: T[], size: number) => {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}

/**
 * Runs `worker` over `values` with at most `concurrency` requests in flight.
 * Keeps the wall clock down without firing hundreds of parallel requests at
 * Spotify, which would just turn into 429s.
 */
export const mapWithConcurrency = async <T, R>(
  values: T[],
  concurrency: number,
  worker: (value: T) => Promise<R>
) => {
  const results: R[] = new Array(values.length)
  let cursor = 0

  const runners = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor++
      results[index] = await worker(values[index])
    }
  })

  await Promise.all(runners)

  return results
}
