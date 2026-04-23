import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { datePass1Atom, useDatePass1List } from '../../hooks/useBnnDriedHooks';
import BnnPass1Bag from './BnnPass1Bag';
import BnnPass1BagPass2 from './BnnPass1BagPass2';

function BnnPass1() {
  const [datePass1, setDatePass1] = useAtom(datePass1Atom);
  const { data: datePass1List } = useDatePass1List();

  useEffect(() => {
    setDatePass1(datePass1List[0] || '');
  }, [datePass1List[0]]);

  return (
    <div>
      <h1>การคัดแยก 1</h1>
      <h6>วันที่คัดแยก 1</h6>
      <select value={datePass1} onChange={(e) => setDatePass1(e.target.value)}>
        <option value="">All Dates</option>
        {datePass1List.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <h2>รายการการคัดแยก 1</h2>
      <BnnPass1Bag />
      <h2>รายการการคัดแยก 2 ที่เกี่ยวข้อง</h2>
      <BnnPass1BagPass2 />
    </div>
  );
}
export default BnnPass1;
