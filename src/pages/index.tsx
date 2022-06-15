import type { NextPage } from 'next'
import { Fragment } from 'react';
import Input from '../components/Form/Input';

const Home: NextPage = () => {
  return (
    <Fragment>
      <div style={{ margin: 20 }}>
        <Input
          label='Testando'
          placeholder='Digite alguma coisa'
        />
      </div>
      {new Array(50).fill(0).map((_, i) => <div key={i} style={{ width: 50, height: 50, marginBottom: 8, backgroundColor: 'red' }}></div>)}
    </Fragment>
  )
}

export default Home;
