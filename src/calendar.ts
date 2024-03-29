import ical, { ICalCalendar } from 'ical-generator'
import { Country } from './country'
import { getReleases, Release } from './release'

const getTitle = (release: Release): string => {
  if (release.title1 !== release.title2) {
    return `${release.title1} - ${release.title2}`
  }

  return release.title1
}

export const createCalendar = async (
  country: Country,
): Promise<ICalCalendar> => {
  const calendar = ical({ name: `Netflix Releases [${country}]` })
  const [metadata, releases] = await getReleases(country)

  if (!metadata) {
    throw new Error('Release not found')
  }

  releases.forEach((release) => {
    calendar.createEvent({
      id: `${release.videoID}-${release.startTime}`,
      start: new Date(release.startTime),
      summary: getTitle(release),
      location: country,
      url: `https://netflix.com/title/${release.videoID}`,
      created: new Date(metadata.updatedAt),
      stamp: new Date(metadata.updatedAt),
    })
  })

  return calendar
}
