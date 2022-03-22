import { FunctionalComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export type TRouteRow = RouteRecordRaw & {
  title?: string
  hidden?: boolean
  icon?: FunctionalComponent
  children?: TRouteRowArray
  alwaysShow?: boolean
}

export type TRouteRowArray = TRouteRow[]
