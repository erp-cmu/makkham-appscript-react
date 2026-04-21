import { useAtom } from 'jotai';

import Home from './components/Home';
import Nav, { navAtom } from './components/Nav';
import BnnDried from './components/bnnDried/BnnDried';
import Packing from './components/packing/Packing';

function App() {
  const [currentNav] = useAtom(navAtom);
  return (
    <>
      <Nav />
      <section hidden={currentNav !== 'home'}>
        <Home />
      </section>
      <section hidden={currentNav !== 'packing'}>
        <Packing />
      </section>
      <section hidden={currentNav !== 'bnn_dried'}>
        <BnnDried />
      </section>
    </>
  );
}

export default App;
