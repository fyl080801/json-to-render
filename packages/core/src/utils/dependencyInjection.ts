import 'reflect-metadata'
import { Inject, InjectMany, Token, ContainerInstance } from 'typedi'

export const createToken = <T>(key?: string) => {
  return new Token<T>(key)
}

export const InjectContainer = () => Inject(() => ContainerInstance)

export { Inject, InjectMany, ContainerInstance }
