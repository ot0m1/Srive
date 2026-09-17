/**
 * @jest-environment node
 */
import { chunk, fetchAllPages, mapWithConcurrency, spotifyFetch } from '../lib/spotify'

const jsonResponse = (body: any, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers })

describe('fetchAllPages', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('follows next links until they run out', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) =>
      Promise.resolve(
        String(url).includes('offset=50')
          ? jsonResponse({ items: [{ id: 'c' }], next: null })
          : jsonResponse({ items: [{ id: 'a' }, { id: 'b' }], next: 'https://api/x?offset=50' })
      )
    )

    const { status, items } = await fetchAllPages<{ id: string }>('https://api/x?offset=0', 'token')

    expect(status).toBe(200)
    expect(items.map((item) => item.id)).toEqual(['a', 'b', 'c'])
  })

  it('stops when a page comes back empty even though next is still set', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(jsonResponse({ items: [{ id: 'a' }], next: 'https://api/x?offset=50' }))
      .mockResolvedValue(jsonResponse({ items: [], next: 'https://api/x?offset=100' }))

    const { items } = await fetchAllPages<{ id: string }>('https://api/x?offset=0', 'token')

    expect(items).toHaveLength(1)
  })

  it('returns what it has when a page fails', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(jsonResponse({ items: [{ id: 'a' }], next: 'https://api/x?offset=50' }))
      .mockResolvedValue(jsonResponse({}, 401))

    const { status, items } = await fetchAllPages<{ id: string }>('https://api/x?offset=0', 'token')

    expect(status).toBe(401)
    expect(items).toHaveLength(1)
  })
})

describe('spotifyFetch', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('retries a 429 and honours Retry-After', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(jsonResponse({}, 429, { 'Retry-After': '0' }))
      .mockResolvedValue(jsonResponse({ ok: true }))

    const response = await spotifyFetch('https://api/x', 'token')

    expect(response.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not retry a 4xx that is not rate limiting', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(jsonResponse({}, 401))

    const response = await spotifyFetch('https://api/x', 'token')

    expect(response.status).toBe(401)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('chunk', () => {
  it('splits into batches of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('returns no batches for an empty array', () => {
    expect(chunk([], 20)).toEqual([])
  })
})

describe('mapWithConcurrency', () => {
  it('keeps results in the order of the input', async () => {
    const values = [30, 10, 20, 0]

    const results = await mapWithConcurrency(values, 2, async (value) => {
      await new Promise((resolve) => setTimeout(resolve, value))
      return value
    })

    expect(results).toEqual(values)
  })

  it('never runs more than the given number at once', async () => {
    let running = 0
    let peak = 0

    await mapWithConcurrency([1, 2, 3, 4, 5, 6, 7], 3, async () => {
      running++
      peak = Math.max(peak, running)
      await new Promise((resolve) => setTimeout(resolve, 5))
      running--
    })

    expect(peak).toBe(3)
  })
})
