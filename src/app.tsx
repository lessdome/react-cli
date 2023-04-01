import {lazy, Suspense} from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {Button, ConfigProvider} from 'antd'

const Home = lazy(() => import('./views/home'))
const About = lazy(() => import('./views/about'))

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'pink',
        },
      }}>
      <BrowserRouter>
        <h1>App</h1>
        <Button type="primary">按钮</Button>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Routes>
          <Route
            path="/home"
            element={
              <Suspense fallback={<div>loading ...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>loading ...</div>}>
                <About />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
