import * as aq from 'arquero';
import { atom, useAtom } from 'jotai';

import { formatDate, formatDateTime } from '../util/date';
import { useRawData } from './useRawData';

export const dateDriedAtom = atom('');

export function useDateDriedList() {
  const { data: rawData } = useRawData();

  if (!rawData) {
    return { data: [] };
  }
  const bnn_dried_bag = rawData['bnn_dried_bag'];
  const dateDriedList = bnn_dried_bag
    .derive({
      '[bnn_dried_bag]_date_dried': aq.escape((d: any) =>
        formatDateTime(d['[bnn_dried_bag]_date_dried']),
      ),
    })
    .orderby(aq.desc('[bnn_dried_bag]_date_dried'))
    .select('[bnn_dried_bag]_date_dried')
    .dedupe()
    .array('[bnn_dried_bag]_date_dried') as string[];
  return {
    data: dateDriedList,
  };
}

export function useBnnDriedBag() {
  const [dateDried, _] = useAtom(dateDriedAtom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }

  const bnn_dried_bag = rawData['bnn_dried_bag'];
  const bnn_pass_1_bag = rawData['bnn_pass_1_bag'];
  const bnn_pass_2_bag = rawData['bnn_pass_2_bag'];
  const lot_number_raw = rawData['lot_number_raw'];

  const dt = bnn_dried_bag
    .join_left(bnn_pass_1_bag, [
      '[bnn_dried_bag]_id',
      '[bnn_pass_1_bag]_bnn_dried_bag',
    ])
    .join_left(bnn_pass_2_bag, [
      '[bnn_pass_1_bag]_id',
      '[bnn_pass_2_bag]_bnn_pass_1_bag',
    ])
    .join_left(lot_number_raw, [
      '[bnn_dried_bag]_lot_number_raw',
      '[lot_number_raw]_lot_number',
    ])
    .derive({
      '[bnn_dried_bag]_date_dried': aq.escape((d: any) =>
        formatDateTime(d['[bnn_dried_bag]_date_dried']),
      ),
      lot_number_date: aq.escape((d: any) =>
        d['[lot_number_raw]_lot_number']
          ? `${d['[lot_number_raw]_lot_number']} (${d['[lot_number_raw]_date']})`
          : '',
      ),
    })
    .orderby(aq.desc('[bnn_dried_bag]_date_dried'));

  // dt.print();
  // console.log(dt.columnNames());
  // console.log({ dt });

  const dtFilt = dateDried
    ? dt.filter(
        aq.escape((d: any) => d['[bnn_dried_bag]_date_dried'] === dateDried),
      )
    : dt;
  return {
    data: dtFilt.objects(),
  };
}
