/**
 * @jest-environment node
 */
import { Release, dedupeRecordings, normalizeTitle } from '../lib/dedupe'

const release = (overrides: Partial<Release> & { uri: string; name: string }): Release => ({
  durationMs: 162000,
  albumType: 'single',
  releaseDate: '2020-01-01',
  ...overrides,
})

describe('normalizeTitle', () => {
  it('drops featured artists, however they are written', () => {
    expect(normalizeTitle('Lane [Feat. Denzel Curry]')).toBe(normalizeTitle('Lane'))
    expect(normalizeTitle('Life Goes On (feat. Sampa the Great)')).toBe(
      normalizeTitle('Life Goes On')
    )
    expect(normalizeTitle('Gold - ft. 18YOMAN')).toBe(normalizeTitle('Gold'))
  })

  it('drops reissue wording', () => {
    expect(normalizeTitle('Rain - Original Mix')).toBe(normalizeTitle('Rain'))
    expect(normalizeTitle('Rain - 2011 Remaster')).toBe(normalizeTitle('Rain'))
    expect(normalizeTitle('Rain (Remastered)')).toBe(normalizeTitle('Rain'))
  })

  it('keeps the wording that makes it a different recording', () => {
    expect(normalizeTitle('Emi Aluta - Zamrock Remix')).not.toBe(
      normalizeTitle('Emi Aluta - 45 Edit')
    )
    expect(normalizeTitle('Final Form (Jersey Club Mix)')).not.toBe(normalizeTitle('Final Form'))
    expect(normalizeTitle('DNA - triple j Like A Version')).not.toBe(normalizeTitle('DNA'))
    expect(normalizeTitle('Rhythm - Live')).not.toBe(normalizeTitle('Rhythm'))
  })

  it('ignores punctuation and case', () => {
    expect(normalizeTitle('Can’t Hold Us')).toBe(normalizeTitle('CANT HOLD US'))
  })
})

describe('dedupeRecordings', () => {
  it('drops a single that re-releases a song an earlier single already had', () => {
    const kept = dedupeRecordings([
      release({ uri: 'first', name: 'Lane', durationMs: 162000, releaseDate: '2019-06-01' }),
      release({
        uri: 'reissue',
        name: 'Lane [Feat. Denzel Curry]',
        durationMs: 162400,
        releaseDate: '2022-01-01',
      }),
    ])

    expect(kept.map((track) => track.uri)).toEqual(['first'])
  })

  it('keeps the album cut next to the single', () => {
    const kept = dedupeRecordings([
      release({ uri: 'album', name: 'Lane', albumType: 'album' }),
      release({ uri: 'single', name: 'Lane [Feat. Denzel Curry]', albumType: 'single' }),
    ])

    expect(kept.map((track) => track.uri)).toEqual(['album', 'single'])
  })

  it('never drops an album track, even against another album', () => {
    const kept = dedupeRecordings([
      release({ uri: 'album', name: 'Shadows', albumType: 'album', releaseDate: '2022-09-01' }),
      release({ uri: 'deluxe', name: 'Shadows', albumType: 'album', releaseDate: '2023-03-01' }),
    ])

    expect(kept).toHaveLength(2)
  })

  it('leaves compilation appearances alone', () => {
    const kept = dedupeRecordings([
      release({ uri: 'a', name: 'Rhymes', albumType: 'compilation' }),
      release({ uri: 'b', name: 'Rhymes', albumType: 'compilation' }),
    ])

    expect(kept).toHaveLength(2)
  })

  it('keeps singles whose length differs by more than the tolerance', () => {
    const kept = dedupeRecordings([
      release({ uri: 'a', name: 'Emi Aluta', durationMs: 231000 }),
      release({ uri: 'b', name: 'Emi Aluta', durationMs: 209000 }),
    ])

    expect(kept).toHaveLength(2)
  })

  it('keeps a remix alongside the original single', () => {
    const kept = dedupeRecordings([
      release({ uri: 'a', name: 'Final Form', durationMs: 180000 }),
      release({ uri: 'b', name: 'Final Form (Jersey Club Mix)', durationMs: 180000 }),
    ])

    expect(kept).toHaveLength(2)
  })

  it('leaves the order of the surviving tracks alone', () => {
    const kept = dedupeRecordings([
      release({ uri: 'a', name: 'One', releaseDate: '2019' }),
      release({ uri: 'b', name: 'Two' }),
      release({ uri: 'c', name: 'One (feat. Someone)', releaseDate: '2021' }),
      release({ uri: 'd', name: 'Three' }),
    ])

    expect(kept.map((track) => track.uri)).toEqual(['a', 'b', 'd'])
  })

  it('does nothing to a list with no repeats', () => {
    const releases = [
      release({ uri: 'a', name: 'One' }),
      release({ uri: 'b', name: 'Two' }),
    ]

    expect(dedupeRecordings(releases)).toEqual(releases)
  })
})
