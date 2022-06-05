import type { NextPage } from 'next'
import { useAuth } from '../context/Auth'

const Home: NextPage = () => {
  const auth = useAuth();
  return (
    <div>
      <button onClick={auth?.isAuthenticated ? auth.logOut : auth?.logIn}>{auth?.isAuthenticated ? 'Logout' : 'Login'}</button>
    </div>
  )
}

export default Home
