import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { datePass2Atom, useDatePass2List } from '../../hooks/useBnnDriedHooks';
import BnnPass2Bag from './BnnPass2Bag';

function BnnPass2() {
  const [datePass2, setDatePass2] = useAtom(datePass2Atom);
  const { data: datePass2List } = useDatePass2List();

  useEffect(() => {
    setDatePass2(datePass2List[0] || '');
  }, [datePass2List[0]]);

  return (
    <div>
      <h1>การคัดแยก 2</h1>
      <h6>วันที่คัดแยก 2</h6>
      <select value={datePass2} onChange={(e) => setDatePass2(e.target.value)}>
        <option value="">All Dates</option>
        {datePass2List.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <h2>รายการการคัดแยก 2</h2>
      <BnnPass2Bag />
    </div>
  );
}
export default BnnPass2;
