import { createCalendar } from './calendar'
import { countries, Country } from './country'
import { etag } from './etag'

const getCountryParam = (requestURL: URL): Country | null => {
  const countryParam = requestURL.pathname.replaceAll(/\//g, '').toUpperCase()

  if (countries.includes(countryParam as Country)) {
    return countryParam as Country
  }

  return null
}

export async function handleRequest(event: FetchEvent): Promise<Response> {
  const request = event.request
  const requestURL = new URL(request.url)
  const country = getCountryParam(requestURL)

  const cacheKey = requestURL.toString()
  const cache = caches.default

  if (!country) {
    return new Response(JSON.stringify({ error: 'Invalid country' }), {
      status: 400,
    })
  }

  const cachedResponse = await cache.match(cacheKey)

  if (cachedResponse) {
    return cachedResponse
  }

  const calendar = await createCalendar(country)

  const body = calendar.toString()
  const response = new Response(body)

  response.headers.set('Content-Type', 'text/calendar; charset=utf-8')
  response.headers.set(
    'Content-Disposition',
    `attachment; filename="netflix-releases-${country}.ics`,
  )
  response.headers.set('Cache-Control', 's-maxage=3600')
  response.headers.set('ETag', await etag(body))

  event.waitUntil(cache.put(cacheKey, response.clone()))

  return response
}
