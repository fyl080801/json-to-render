import { createToken } from '../utils'

export const servicesToken = createToken<Record<string, unknown>>('services')
