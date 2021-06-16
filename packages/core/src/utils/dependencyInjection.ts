import 'reflect-metadata'
import { Token, ContainerInstance } from '../di'

export const createToken = <T>(key?: string) => {
  return new Token<T>(key)
}

export { ContainerInstance }
