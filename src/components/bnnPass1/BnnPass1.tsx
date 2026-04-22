import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { datePass1Atom, useDatePass1List } from '../../hooks/useBnnDriedHooks';
import BnnPass1Bag from './BnnPass1Bag';

function BnnPass1() {
  const [datePass1, setDatePass1] = useAtom(datePass1Atom);
  const { data: datePass1List } = useDatePass1List();

  useEffect(() => {
    setDatePass1(datePass1List[0] || '');
  }, [datePass1List[0]]);

  return (
    <div>
      <h1>การตากแห้ง</h1>
      <h6>วันที่ตากแห้ง</h6>
      <select value={datePass1} onChange={(e) => setDatePass1(e.target.value)}>
        <option value="">All Dates</option>
        {datePass1List.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <BnnPass1Bag />
    </div>
  );
}
export default BnnPass1;
