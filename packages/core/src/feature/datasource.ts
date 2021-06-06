import { servicesToken } from '../service/token'
import { DatasourceBuilder, DatasourceMeta, DatasourceOptions } from '../types'
import {
  assignObject,
  ContainerInstance,
  createToken,
  InjectContainer,
} from '../utils'
import { proxyContextToken, proxyServiceToken } from './proxy'

export const datasourceToken = createToken<DatasourceMeta>('datasource')

export const datasourceServiceToken =
  createToken<DatasourceService>('datasourceService')

export class DatasourceService {
  private readonly services: Record<string, unknown>

  constructor(
    @InjectContainer() private readonly container: ContainerInstance
  ) {
    this.services = container.get(servicesToken)
  }

  private get context() {
    return this.container.get(proxyContextToken)
  }

  private get datasources() {
    return this.container.getMany(datasourceToken)
  }

  private get proxy() {
    return this.container.get(proxyServiceToken)
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
    const { type, props } = this.proxy.inject(
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
