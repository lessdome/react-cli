import Fallback from '@/components/fallback'
import {FC, PropsWithChildren, Suspense} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import config, {IRouteConf} from './config'

const RouteComp: FC<IRouteConf> = ({redirect, element: Component}) => {
  if (!!redirect) return <Navigate to={redirect} />

  if (!!Component) return <Component />

  return null
}

export interface IRouterProps {
  layout?: FC<PropsWithChildren>
}

const Router: FC<IRouterProps> = ({layout: Layout}) => {
  return (
    <>
      <BrowserRouter basename="/">
        <Suspense fallback={<Fallback />}>
          {!!Layout ? (
            <Layout>
              <Routes>
                {config.map(route => (
                  <Route key={route.path} {...route} element={<RouteComp {...route} />} />
                ))}
              </Routes>
            </Layout>
          ) : (
            <Routes>
              {config.map(route => (
                <Route key={route.path} {...route} element={<RouteComp {...route} />} />
              ))}
            </Routes>
          )}
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default Router
