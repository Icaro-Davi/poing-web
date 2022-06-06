import type { NextPage } from 'next'
import { useAuth } from '../context/Auth'

const Home: NextPage = () => {
  const auth = useAuth();
  return (
    <div>
      <button onClick={auth?.isAuthenticated ? auth.logOut : auth?.logIn}>{auth?.isAuthenticated ? 'Logout' : 'Login'}</button>
      {new Array(50).fill(0).map((_, i) => <div key={i} style={{ width: 50, height: 50, marginBottom: 8, backgroundColor: 'red' }}></div>)}
    </div>
  )
}

export default Home;
