import { useAtom } from 'jotai';

import Home from './components/Home';
import Nav, { navAtom } from './components/Nav';
import Packing from './components/Packing';

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
    </>
  );
}

export default App;
