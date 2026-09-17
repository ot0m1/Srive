// Two releases of the same recording are never sample-accurate, but they are
// close. Anything further apart than this is a different take or edit.
const DURATION_TOLERANCE_MS = 2500

// An album cut and a single of the same song both earn their place — nobody
// wants songs missing from an album. What repeats for no reason is a song put
// out as a single over and over, so singles are the only thing collapsed here.
const DEDUPED_ALBUM_TYPE = 'single'

export type Release = {
  uri: string
  name: string
  durationMs: number
  albumType: string
  releaseDate: string
}

// Parts that only say who else is on the track, or that the master was redone.
// Anything else — (Jersey Club Mix), - Live, - Radio Edit — is what makes a
// recording a different recording, so it has to survive normalization.
const CREDIT_PART = /^(feat\.?|ft\.?|featuring|with)\s/i
const REISSUE_PART =
  /^(original(\s(mix|version))?|album\sversion|(\d{4}\s)?remaster(ed)?(\s(version\s)?\d{4})?|bonus\strack)$/i

const isDroppable = (part: string) => CREDIT_PART.test(part) || REISSUE_PART.test(part)

export const normalizeTitle = (title: string) => {
  const bracketsStripped = String(title == null ? '' : title).replace(
    /[([]([^()[\]]*)[)\]]/g,
    (whole, inner) => (isDroppable(String(inner).trim()) ? '' : whole)
  )

  // Spotify also hangs the version on the end after a dash.
  const suffixStripped = bracketsStripped
    .split(/\s[-–—]\s/)
    .filter((part, index) => index === 0 || !isDroppable(part.trim()))
    .join(' - ')

  return suffixStripped
    .toLowerCase()
    // Apostrophes vanish rather than becoming a gap, so "Can't" and "Cant"
    // still meet. Spotify is not consistent about ' versus ’ either.
    .replace(/['’‘`]/g, '')
    .replace(/["“”.,!?()[\]{}:;/\\&+*^~|<>#@$%=_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const isEarlier = (candidate: Release, current: Release) =>
  // Dates can be a year, a month or a full date, but they still sort
  // chronologically as strings.
  String(candidate.releaseDate) < String(current.releaseDate)

/**
 * Drops singles that put out a recording the playlist already has as a single.
 * The original stays; the re-releases go.
 *
 * Album and compilation tracks are never touched, so a song existing as both
 * an album cut and a single still shows up twice — those are two versions
 * worth having, unlike the fourth pressing of the same single.
 *
 * Surviving tracks keep their original order.
 */
export const dedupeRecordings = <T extends Release>(releases: T[]) => {
  const clusters = new Map<string, T[][]>()

  for (const release of releases) {
    if (release.albumType !== DEDUPED_ALBUM_TYPE) {
      continue
    }

    const key = normalizeTitle(release.name)
    const groups = clusters.get(key)

    if (!groups) {
      clusters.set(key, [[release]])
      continue
    }

    const group = groups.find((members) =>
      members.some(
        (member) => Math.abs(member.durationMs - release.durationMs) <= DURATION_TOLERANCE_MS
      )
    )

    if (group) {
      group.push(release)
    } else {
      groups.push([release])
    }
  }

  const dropped = new Set<string>()

  clusters.forEach((groups) =>
    groups.forEach((members) => {
      const original = members.reduce((earliest, member) =>
        isEarlier(member, earliest) ? member : earliest
      )

      members.forEach((member) => {
        if (member.uri !== original.uri) {
          dropped.add(member.uri)
        }
      })
    })
  )

  return releases.filter((release) => !dropped.has(release.uri))
}
