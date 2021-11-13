export const countries = ['US', 'GB', 'DE', 'AT', 'CH'] as const

export type Country = typeof countries[number]
