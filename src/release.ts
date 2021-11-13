import { Country } from './country'

declare const KV_RELEASES: KVNamespace

export interface Release {
  videoID: number
  country: string
  title1: string
  title2: string
  startTime: number
  collection: number
  image: string
  genre: number
}

interface Metadata {
  updatedAt: number
  country: Country
}

export const putReleases = (
  country: Country,
  data: Release[],
): Promise<void> => {
  return KV_RELEASES.put(country, JSON.stringify(data), {
    metadata: {
      updatedAt: Date.now(),
      country,
    },
  })
}

export const getReleases = async (
  country: Country,
): Promise<[Metadata | null, Release[]]> => {
  const response = await KV_RELEASES.getWithMetadata<Release[], Metadata>(
    country,
    'json',
  )
  return [response.metadata, response.value ?? []]
}
