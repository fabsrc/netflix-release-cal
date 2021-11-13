import ical, { ICalCalendar } from 'ical-generator'
import { Country } from './country'
import { getReleases } from './release'

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
      start: new Date(release.startTime),
      summary: `${release.title1} - ${release.title2}`,
      location: country,
      url: `https://netflix.com/title/${release.videoID}`,
      created: new Date(metadata.updatedAt),
    })
  })

  return calendar
}
