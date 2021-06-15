import { servicesToken } from '../service/token'
import {
  DatasourceBuilder,
  DatasourceMeta,
  DatasourceOptions,
  ProxyContext,
} from '../types'
import {
  assignObject,
  ContainerInstance,
  createToken,
  InjectContainer,
} from '../utils'
import { proxyContextToken, ProxyService, proxyServiceToken } from './proxy'

export const datasourceToken = createToken<DatasourceMeta>('datasource')

export const datasourceServiceToken =
  createToken<DatasourceService>('datasourceService')

export class DatasourceService {
  private readonly proxyService: ProxyService
  private readonly datasources: DatasourceMeta[]
  private readonly context: ProxyContext
  private readonly services: Record<string, unknown>

  constructor(@InjectContainer() container: ContainerInstance) {
    this.proxyService = container.get(proxyServiceToken)
    this.datasources = container.getMany(datasourceToken)
    this.context = container.get(proxyContextToken)
    this.services = container.get(servicesToken)
  }

  private getMap() {
    return this.datasources.reduce((pre, cur) => {
      pre[cur.type] = cur.build
      return pre
    }, {} as { [key: string]: DatasourceBuilder })
  }

  release(key: string) {
    delete this.context[key]
  }

  build(key: string, options: DatasourceOptions) {
    const injected = this.proxyService.inject(
      assignObject(options),
      this.context
    )

    const maped = this.getMap()

    const build = maped[injected.type]

    if (build) {
      this.context[key] = build(injected, this.services)
    }
  }
}
