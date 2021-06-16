/**
 * We have a hard dependency on reflect-metadata package.
 * Without the dependency lookup wont work. So we should warn the users
 * when it's not loaded.
 */
// if(!Reflect || !(Reflect as any).getMetadata) {
//   throw new Error('Reflect.getMetadata is not a function. Please import the "reflect-metadata" package at the first line of your application.');
// }

import { Container } from './container'

export * from './decorators/injectMany'
export * from './decorators/inject'
export * from './decorators/service'

export * from './error/cannotInjectValue'
export * from './error/cannotInstantiateValue'
export * from './error/serviceNotFound'

export * from './interfaces/handler'
export * from './interfaces/serviceMetadata'
export * from './interfaces/serviceOptions'
export * from './types/constructable'
export * from './types/serviceIdentifier'

export * from './container'
export * from './container'
export * from './token'

export default Container
