import {lazy, LazyExoticComponent} from 'react'
import {PathRouteProps} from 'react-router'

export interface IRouteConf extends Omit<PathRouteProps, 'element'> {
  redirect?: string
  element?: LazyExoticComponent<() => JSX.Element>
}

const config: Array<IRouteConf> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    element: lazy(() => import('../views/home')),
  },
  {
    path: '/about',
    element: lazy(() => import('../views/about')),
  },
]

export default config
