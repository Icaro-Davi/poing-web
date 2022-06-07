import type { NextPage } from 'next'
import Link from 'next/link';
import { useAuth } from '../context/Auth'

const Home: NextPage = () => {
  const auth = useAuth();
  return (
    <div>
      {new Array(50).fill(0).map((_, i) => <div key={i} style={{ width: 50, height: 50, marginBottom: 8, backgroundColor: 'red' }}></div>)}
    </div>
  )
}

export default Home;
