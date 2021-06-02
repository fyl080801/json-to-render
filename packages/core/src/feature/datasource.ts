import { servicesToken } from '../service/token'
import {
  DatasourceBuilder,
  DatasourceMeta,
  DatasourceOptions,
  ProxyContext,
} from '../types'
import { assignObject, createToken, Inject, InjectMany } from '../utils'
import { proxyContextToken, ProxyService, proxyServiceToken } from './proxy'

export const datasourceToken = createToken<DatasourceMeta>('datasource')

export const datasourceServiceToken =
  createToken<DatasourceService>('datasourceService')

export class DatasourceService {
  constructor(
    @Inject(proxyServiceToken) private readonly proxyService: ProxyService,
    @InjectMany(datasourceToken) private readonly datasources: DatasourceMeta[],
    @Inject(proxyContextToken) private readonly context: ProxyContext,
    @Inject(servicesToken) private readonly services: { [key: string]: unknown }
  ) {}

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
    const { type, props } = this.proxyService.inject(
      assignObject(options),
      this.context
    )

    const maped = this.getMap()

    const build = maped[type]

    if (build) {
      this.context[key] = build(props, this.services)
    }
  }
}
