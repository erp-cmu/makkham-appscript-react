import { useAtom } from 'jotai';

import {
  packingLedgerDateAtom,
  usePackingLedgeDateList,
} from '../hooks/usePackingHooks';
import { useRawData } from '../hooks/useRawData';
import PackingBnnPass1 from './PackingBnnPass1';
import PackingProduct from './PackingProduct';

function Packing() {
  const { isLoading, error } = useRawData();
  const { data: packingLedgerDateList } = usePackingLedgeDateList();
  const [_, setPackingLedgerDate] = useAtom(packingLedgerDateAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Packing</h1>
      <select onChange={(e) => setPackingLedgerDate(e.target.value)}>
        <option value="">All Dates</option>
        {packingLedgerDateList.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <PackingProduct />
      <PackingBnnPass1 />
    </>
  );
}

export default Packing;
