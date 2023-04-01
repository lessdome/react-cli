import {FC} from 'react'
import Layout from './components/layout'
import Router from './router'
import Store from './store'

import './styles/reset/index.scss'

const App: FC = () => {
  return (
    <Store>
      <Router layout={Layout} />
    </Store>
  )
}

export default App
