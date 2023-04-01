import {FC, PropsWithChildren} from 'react'
import {Link} from 'react-router-dom'

const Layout: FC<PropsWithChildren> = ({children}) => (
  <>
    <div>
      <Link to="/home">home</Link>
      &nbsp;
      <Link to="/about">about</Link>
    </div>
    {children}
  </>
)

export default Layout
