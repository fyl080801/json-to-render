import { ServiceMetadata } from './serviceMetadata'

/**
 * The public ServiceOptions is partial object of ServiceMetadata and either one
 * of the following is set: `type`, `factory`, `value` but not more than one.
 */
export type ServiceOptions<T = unknown> =
  | Omit<Partial<ServiceMetadata<T>>, 'type' | 'factory'>
  | Omit<Partial<ServiceMetadata<T>>, 'value' | 'factory'>
  | Omit<Partial<ServiceMetadata<T>>, 'value' | 'type'>
