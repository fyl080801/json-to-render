import 'reflect-metadata'
import { Inject, InjectMany, Token } from 'typedi'

export const createToken = <T>(key: string) => {
  return new Token<T>(key)
}

export { Inject, InjectMany }
