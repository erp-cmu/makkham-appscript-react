import * as aq from 'arquero';
import { atom, useAtom } from 'jotai';

import { formatDateTime } from '../util/date';
import { useRawData } from './useRawData';

export const dateDriedAtom = atom('');
export const datePass1Atom = atom('');
export const datePass2Atom = atom('');
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

export function useDatePass1List() {
  const { data: rawData } = useRawData();

  if (!rawData) {
    return { data: [] };
  }
  const bnn_pass_1_bag = rawData['bnn_pass_1_bag'];
  const datePass1List = bnn_pass_1_bag
    .derive({
      '[bnn_pass_1_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_1_bag]_date']),
      ),
    })
    .orderby(aq.desc('[bnn_pass_1_bag]_date'))
    .select('[bnn_pass_1_bag]_date')
    .dedupe()
    .array('[bnn_pass_1_bag]_date') as string[];
  return {
    data: datePass1List,
  };
}

export function useDatePass2List() {
  const { data: rawData } = useRawData();

  if (!rawData) {
    return { data: [] };
  }
  const bnn_pass_2_bag = rawData['bnn_pass_2_bag'];
  const datePass2List = bnn_pass_2_bag
    .derive({
      '[bnn_pass_2_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_2_bag]_date']),
      ),
    })
    .orderby(aq.desc('[bnn_pass_2_bag]_date'))
    .select('[bnn_pass_2_bag]_date')
    .dedupe()
    .array('[bnn_pass_2_bag]_date') as string[];
  return {
    data: datePass2List,
  };
}

function bnnBagJoin(rawData: Record<string, aq.ColumnTable>) {
  const bnn_dried_bag = rawData['bnn_dried_bag'];
  const bnn_pass_1_bag = rawData['bnn_pass_1_bag'];
  const bnn_pass_2_bag = rawData['bnn_pass_2_bag'];
  const lot_number_raw = rawData['lot_number_raw'];

  const dt = bnn_dried_bag
    .join_full(bnn_pass_1_bag, [
      '[bnn_dried_bag]_id',
      '[bnn_pass_1_bag]_bnn_dried_bag',
    ])
    .join_full(bnn_pass_2_bag, [
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
      '[bnn_pass_1_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_1_bag]_date']),
      ),
      '[bnn_pass_2_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_2_bag]_date']),
      ),
    })
    .orderby(aq.desc('[bnn_dried_bag]_date_dried'));
  // dt.print();
  // console.log(dt.columnNames());
  // console.log({ dt });
  return dt;
}

export function useBnnDriedBag() {
  const [dateDried, _] = useAtom(dateDriedAtom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const dt = bnnBagJoin(rawData);
  const dtFilt = dateDried
    ? dt.filter(
        aq.escape((d: any) => d['[bnn_dried_bag]_date_dried'] === dateDried),
      )
    : dt;
  return {
    data: dtFilt.objects(),
  };
}

export function useBnnPass1() {
  const [datePass1, _] = useAtom(datePass1Atom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const dt = bnnBagJoin(rawData);

  // dt.print();
  // console.log({ dt });

  // Filter out rows where '[bnn_pass_1_bag]_date' is null, undefined, or empty string

  // I got error "void0 is not defined" when I used "d['[bnn_pass_1_bag]_date'] !== undefined" in production.
  // This is due to the GAS engine striping out space from "void 0" to "void0" and then it is not defined.
  // So I change the condition to use Boolean() to check if the value is truthy or falsy.

  // const dtNotNull = dt.filter(
  //   (d) =>
  //     d['[bnn_pass_1_bag]_date'] !== undefined &&
  //     d['[bnn_pass_1_bag]_date'] !== null &&
  //     d['[bnn_pass_1_bag]_date'] !== '',
  // );

  const dtNotNull = dt.filter(
    aq.escape((d: any) => Boolean(d['[bnn_pass_1_bag]_date'])),
  );
  // dtNotNull.print();
  // console.log({ dtNotNull });

  // Further filter the data based on the selected datePass1
  const dtNotNullFilt = dtNotNull.filter(
    aq.escape((d: any) => d['[bnn_pass_1_bag]_date'] === datePass1),
  );

  return {
    data: dtNotNullFilt.objects(),
  };
}

export function useBnnPass2() {
  const [datePass2, _] = useAtom(datePass2Atom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const dt = bnnBagJoin(rawData);

  // dt.print();
  // console.log({ dt });

  // Filter out rows where '[bnn_pass_2_bag]_date' is null, undefined, or empty string

  // I got error "void0 is not defined" when I used "d['[bnn_pass_1_bag]_date'] !== undefined" in production.
  // This is due to the GAS engine striping out space from "void 0" to "void0" and then it is not defined.
  // So I change the condition to use Boolean() to check if the value is truthy or falsy.

  // const dtNotNull = dt.filter(
  //   (d) =>
  //     d['[bnn_pass_2_bag]_date'] !== undefined &&
  //     d['[bnn_pass_2_bag]_date'] !== null &&
  //     d['[bnn_pass_2_bag]_date'] !== '',
  // );

  const dtNotNull = dt.filter(
    aq.escape((d: any) => Boolean(d['[bnn_pass_2_bag]_date'])),
  );

  // dtNotNull.print();
  // console.log({ dtNotNull });

  // Further filter the data based on the selected datePass2
  const dtNotNullFilt = dtNotNull.filter(
    aq.escape((d: any) => d['[bnn_pass_2_bag]_date'] === datePass2),
  );

  return {
    data: dtNotNullFilt.objects(),
  };
}
