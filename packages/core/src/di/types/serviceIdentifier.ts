import { Token } from '../token'
import { Constructable } from './constructable'
import { AbstractConstructable } from './abstractConstructable'

/**
 * Unique service identifier.
 * Can be some class type, or string id, or instance of Token.
 */
export type ServiceIdentifier<T = unknown> =
  | Constructable<T>
  | AbstractConstructable<T>
  | CallableFunction
  | Token<T>
  | string
