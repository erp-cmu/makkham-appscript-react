import * as aq from 'arquero';
import { atom, useAtom } from 'jotai';

import { formatDateTime } from '../util/date';
import { useRawData } from './useRawData';

export const packingLedgerDateAtom = atom<string>('');

export function usePackingLedgeDateList() {
  const { data: rawData } = useRawData();
  if (!rawData) {
    return { data: [] };
  }
  const packingLedger = rawData['packing_ledger'];
  const packingLedgerDateList = packingLedger
    .derive({
      '[packing_ledger]_date': aq.escape((d: any) =>
        formatDateTime(d['[packing_ledger]_date']),
      ),
    })
    .orderby(aq.desc('[packing_ledger]_date'))
    .select('[packing_ledger]_date')
    .dedupe()
    .array('[packing_ledger]_date') as string[];
  return {
    data: packingLedgerDateList,
  };
}

export function usePackingProduct() {
  const [packingLedgerDate, _] = useAtom(packingLedgerDateAtom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const packingLedger = rawData['packing_ledger'];
  const productItem = rawData['product_item'];
  const lotNumberProduct = rawData['lot_number_product'];
  const product = rawData['product'];

  // Product
  const dt = packingLedger
    .join_left(productItem, [
      '[packing_ledger]_id',
      '[product_item]_packing_ledger',
    ])
    .join_left(lotNumberProduct, [
      '[product_item]_lot_number_product',
      '[lot_number_product]_lot_number',
    ])
    .join_left(product, ['[product_item]_product', '[product]_id'])
    .derive({
      '[packing_ledger]_date': aq.escape((d: any) =>
        formatDateTime(d['[packing_ledger]_date']),
      ),
      '[lot_number_product]_date': aq.escape((d: any) =>
        formatDateTime(d['[lot_number_product]_date']),
      ),
      product_id_name: aq.escape((d: any) =>
        d['[product]_id'] ? `${d['[product]_id']}: ${d['[product]_name']}` : '',
      ),
      lot_number_product_date: aq.escape((d: any) =>
        d['[lot_number_product]_lot_number']
          ? `${d['[lot_number_product]_lot_number']} (${d['[lot_number_product]_date']})`
          : '',
      ),
    });

  const dtFilt = packingLedgerDate
    ? dt.filter(
        aq.escape((d: any) => d['[packing_ledger]_date'] === packingLedgerDate),
      )
    : dt;

  return {
    data: dtFilt.objects(),
  };
}

export function usePackingBnnPass1() {
  const [packingLedgerDate, _] = useAtom(packingLedgerDateAtom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const packingLedger = rawData['packing_ledger'];
  const bnnPass1Item = rawData['bnn_pass_1_item'];
  const bnnPass1Bag = rawData['bnn_pass_1_bag'];
  const bnnDriedBag = rawData['bnn_dried_bag'];
  const furnace = rawData['furnace'];

  // Bag 1
  const dt = packingLedger
    .join_left(bnnPass1Item, [
      '[packing_ledger]_id',
      '[bnn_pass_1_item]_packing_ledger',
    ])
    .join_left(bnnPass1Bag, [
      '[bnn_pass_1_item]_bnn_pass_1_bag',
      '[bnn_pass_1_bag]_id',
    ])
    .join_left(bnnDriedBag, [
      '[bnn_pass_1_bag]_bnn_dried_bag',
      '[bnn_dried_bag]_id',
    ])
    .join_left(furnace, ['[bnn_dried_bag]_furnace', '[furnace]_id'])
    .derive({
      '[packing_ledger]_date': aq.escape((d: any) =>
        formatDateTime(d['[packing_ledger]_date']),
      ),
      '[bnn_pass_1_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_1_bag]_date']),
      ),
      '[bnn_dried_bag]_date_dried': aq.escape((d: any) =>
        formatDateTime(d['[bnn_dried_bag]_date_dried']),
      ),
      '[bnn_dried_bag]_date_transaction': aq.escape((d: any) =>
        formatDateTime(d['[bnn_dried_bag]_date_transaction']),
      ),
      '[bnn_pass_1_item]_original_weight_pass_1': (d) =>
        aq.op.parse_float(d['[bnn_pass_1_item]_original_weight_pass_1']),
      '[bnn_pass_1_bag]_weight_pass_1_remaining': (d) =>
        aq.op.parse_float(d['[bnn_pass_1_bag]_weight_pass_1_remaining']),
    });

  // dt.print();
  // console.log({ dt });
  const dtFilt = packingLedgerDate
    ? dt.filter(
        aq.escape((d: any) => d['[packing_ledger]_date'] === packingLedgerDate),
      )
    : dt;
  return {
    data: dtFilt.objects(),
  };
}

export function usePackingBnnPass2() {
  const [packingLedgerDate, _] = useAtom(packingLedgerDateAtom);
  const { data: rawData } = useRawData();
  if (!rawData) {
    return {
      data: null,
    };
  }
  const packingLedger = rawData['packing_ledger'];
  const bnnPass2Item = rawData['bnn_pass_2_item'];
  const bnnPass2Bag = rawData['bnn_pass_2_bag'];

  // Bag 2
  const dt = packingLedger
    .join_left(bnnPass2Item, [
      '[packing_ledger]_id',
      '[bnn_pass_2_item]_packing_ledger',
    ])
    .join_left(bnnPass2Bag, [
      '[bnn_pass_2_item]_bnn_pass_2_bag',
      '[bnn_pass_2_bag]_id',
    ])
    .derive({
      '[packing_ledger]_date': aq.escape((d: any) =>
        formatDateTime(d['[packing_ledger]_date']),
      ),
      '[bnn_pass_2_bag]_date': aq.escape((d: any) =>
        formatDateTime(d['[bnn_pass_2_bag]_date']),
      ),
      '[bnn_pass_2_item]_original_weight_pass_2': (d) =>
        aq.op.parse_float(d['[bnn_pass_2_item]_original_weight_pass_2']),
      '[bnn_pass_2_bag]_weight_pass_2_remaining': (d) =>
        aq.op.parse_float(d['[bnn_pass_2_bag]_weight_pass_2_remaining']),
    });

  // dt.print();
  // console.log({ dt });
  const dtFilt = packingLedgerDate
    ? dt.filter(
        aq.escape((d: any) => d['[packing_ledger]_date'] === packingLedgerDate),
      )
    : dt;
  return {
    data: dtFilt.objects(),
  };
}
