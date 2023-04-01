import ReactDom from 'react-dom/client'
import App from './app'

const root = document.getElementById('root') as Element

ReactDom.createRoot(root).render(<App />)
