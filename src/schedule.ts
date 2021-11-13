import { countries } from './country'
import { putReleases, Release } from './release'

interface ReleaseResponse {
  totalItems: number
  current: number
  totalPages: number
  perPage: number
  genres: number[]
  collectionIDs: number[]
  data: Release[]
}

const fetchPaginated = (
  url: string,
  page = 1,
  data: Release[] = [],
): Promise<Release[]> => {
  return fetch(`${url}&page=${page}`)
    .then((res) => res.json<ReleaseResponse>())
    .then((res) => {
      const newData = [...data, ...res.data]

      if (page === res.totalPages) {
        return newData
      }

      return fetchPaginated(url, page + 1, newData)
    })
    .catch((err) => {
      console.error(err)
      return []
    })
}

export async function handleScheduled(): Promise<void> {
  await Promise.all(
    countries.map(async (country) => {
      const releases = await fetchPaginated(
        `https://about.netflix.com/api/data/releases?language=en&country=${country}`,
      )

      if (releases?.length === 0) {
        console.warn(`No releases updated for ${country}`)
      }

      await putReleases(country, releases)

      console.log(`Updated ${releases.length} releases for ${country}`)
    }),
  )
}
