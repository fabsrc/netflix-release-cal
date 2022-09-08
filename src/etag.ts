export const etag = async (entity: string): Promise<string> => {
  const encodedEntity = new TextEncoder().encode(entity)
  const digest = await crypto.subtle.digest('SHA-1', encodedEntity)
  return Buffer.from(digest).toString('base64')
}
