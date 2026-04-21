import { useAtom } from 'jotai';
import { useEffect } from 'react';

import {
  packingLedgerDateAtom,
  usePackingLedgeDateList,
} from '../../hooks/usePackingHooks';
import { useRawData } from '../../hooks/useRawData';
import PackingBnnPass1 from './PackingBnnPass1';
import PackingProduct from './PackingProduct';

function Packing() {
  const { isLoading, error } = useRawData();
  const { data: packingLedgerDateList } = usePackingLedgeDateList();
  const [packingLedgerDate, setPackingLedgerDate] = useAtom(
    packingLedgerDateAtom,
  );

  useEffect(() => {
    setPackingLedgerDate(packingLedgerDateList[0] || '');
  }, [packingLedgerDateList[0]]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>การบรรจุภัณฑ์</h1>
      <h6>Packing Date</h6>
      <select
        value={packingLedgerDate}
        onChange={(e) => setPackingLedgerDate(e.target.value)}
      >
        <option value="">All Dates</option>
        {packingLedgerDateList.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <h2>Packing Products</h2>
      <PackingProduct />
      <h2>Pass 1</h2>
      <PackingBnnPass1 />
    </>
  );
}

export default Packing;
