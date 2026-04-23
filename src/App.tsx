import { useAtom } from 'jotai';

import Home from './components/Home';
import Nav, { navAtom } from './components/Nav';
import BnnDried from './components/bnnDried/BnnDried';
import BnnPass1 from './components/bnnPass1/BnnPass1';
import BnnPass2 from './components/bnnPass2/BnnPass2';
import Packing from './components/packing/Packing';

function App() {
  const [currentNav] = useAtom(navAtom);
  return (
    <>
      <Nav />
      <section hidden={currentNav !== 'home'}>
        <Home />
      </section>
      <section hidden={currentNav !== 'bnn_dried'}>
        <BnnDried />
      </section>
      <section hidden={currentNav !== 'bnn_pass_1'}>
        <BnnPass1 />
      </section>
      <section hidden={currentNav !== 'bnn_pass_2'}>
        <BnnPass2 />
      </section>
      <section hidden={currentNav !== 'packing'}>
        <Packing />
      </section>
    </>
  );
}

export default App;
