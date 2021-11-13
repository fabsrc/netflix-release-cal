import { handleScheduled } from './schedule'
import { handleRequest } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

addEventListener('scheduled', (event) => {
  event.waitUntil(handleScheduled())
})
