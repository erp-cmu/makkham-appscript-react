import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { dateDriedAtom, useDateDriedList } from '../../hooks/useBnnDriedHooks';
// import BnnDriedBag from './BnnDriedBag';
// import BnnDriedBagPass2 from './BnnDriedBagPass2';
import BnnPass1Table from './BnnPass1Table';

function BnnDried() {
  const [dateDried, setDateDried] = useAtom(dateDriedAtom);
  const { data: dateDriedList } = useDateDriedList();

  useEffect(() => {
    setDateDried(dateDriedList[0] || '');
  }, [dateDriedList[0]]);

  return (
    <div>
      <h1>การตากแห้ง</h1>
      <h6>วันที่ตากแห้ง</h6>
      <select value={dateDried} onChange={(e) => setDateDried(e.target.value)}>
        <option value="">All Dates</option>
        {dateDriedList.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}
export default BnnDried;
