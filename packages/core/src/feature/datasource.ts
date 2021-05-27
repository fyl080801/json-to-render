import { servicesToken } from '../service/token'
import {
  DatasourceBuilder,
  DatasourceMeta,
  DatasourceOptions,
  ProxyContext,
} from '../types'
import { assignObject, createToken, Inject, InjectMany } from '../utils'
import { ProxyService, proxyServiceToken } from './proxy'

export const datasourceToken = createToken<DatasourceMeta>('datasource')

export const datasourceServiceToken =
  createToken<DatasourceService>('datasourceService')

export class DatasourceService {
  constructor(
    @Inject(proxyServiceToken) private readonly proxyService: ProxyService,
    @InjectMany(datasourceToken) private readonly datasources: DatasourceMeta[],
    @Inject(servicesToken) private readonly services: { [key: string]: unknown }
  ) {}

  private getMap() {
    return this.datasources.reduce((pre, cur) => {
      pre[cur.type] = cur.build
      return pre
    }, {} as { [key: string]: DatasourceBuilder })
  }

  build(options: DatasourceOptions, context: ProxyContext) {
    const { type, props } = this.proxyService.inject(
      assignObject(options),
      context
    )

    const maped = this.getMap()

    const build = maped[type]

    if (build) {
      context[type] = build(props, this.services)
    }
  }
}
