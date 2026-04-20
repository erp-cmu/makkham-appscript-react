import * as aq from 'arquero';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useRawData } from './useRawData';

export function usePacking() {
  const [datePackingLedger, setDatePackingLedger] = useState('');
  const { data: rawData, isLoading, error } = useRawData();

  // console.log({ rawData });
  if (isLoading || !rawData) {
    return {
      dataProduct: null,
      packingLedger: null,
      datePackingLedgerList: [],
      isLoading,
      error,
    };
  }
  const packingLedger = rawData['packing_ledger'];
  const productItem = rawData['product_item'];
  const bnnPass1Item = rawData['bnn_pass_1_item'];
  const bnnPass1Bag = rawData['bnn_pass_1_bag'];
  const bnnPass2Item = rawData['bnn_pass_2_item'];
  const bnnPass2Bag = rawData['bnn_pass_2_bag'];
  const lotNumberProduct = rawData['lot_number_product'];
  const product = rawData['product'];

  // Product
  const dtProduct = packingLedger
    .join_left(productItem, ['id', 'packing_ledger'])
    .join_left(lotNumberProduct, ['lot_number_product', 'lot_number'])
    .join_left(product, ['product', 'id'])
    .rename({
      id_1: 'id_packing_ledger',
      date_1: 'date_packing_ledger',
      id_2: 'id_product_item',
      quantity: 'quantity_product_item',
      date_2: 'date_lot_number_product',
      id: 'id_product',
      name: 'name_product',
      size: 'size_product',
    })
    .derive({
      date_packing_ledger: aq.escape((d: any) =>
        formatDateTime(d.date_packing_ledger),
      ),
      date_lot_number_product: aq.escape((d: any) =>
        formatDate(d.date_lot_number_product),
      ),
      id_name_product: aq.escape(
        (d: any) => `${d.id_product}: ${d.name_product}`,
      ),
      id_date_lot_number_product: aq.escape(
        (d: any) => `${d.lot_number_product} (${d.date_lot_number_product})`,
      ),
    })
    .select(aq.not(['lot_number', 'product']));

  const dtProductFilt = datePackingLedger
    ? dtProduct.filter(
        aq.escape((d: any) => d.date_packing_ledger === datePackingLedger),
      )
    : dtProduct;

  // Bag 1
  const dtPass1 = packingLedger
    .join_left(bnnPass1Item, ['id', 'packing_ledger'])
    .join_left(bnnPass1Bag, ['bnn_pass_1_bag', 'id'])
    .rename({
      id_1: 'id_packing_ledger',
      date_1: 'date_packing_ledger',
      id_2: 'id_bnn_pass_1_item',
      date_2: 'date_bnn_pass_1_item',
      id: 'id_bnn_pass_1_bag',
    });

  dtPass1.print();
  console.log({ dtPass1 });

  const datePackingLedgerList = dtProduct
    .orderby(aq.desc('date_packing_ledger'))
    .select('date_packing_ledger')
    .dedupe()
    .array('date_packing_ledger') as string[];

  return {
    dataProduct: dtProductFilt.objects(),
    datePackingLedgerList,
    setDatePackingLedger,
    isLoading,
    error,
  };
}

function formatDate(dateStr: string) {
  const d = dayjs(dateStr, 'MM/DD/YYYY');
  return d.format('YYYY-MM-DD');
}

function formatDateTime(dateStr: string) {
  const d = dayjs(dateStr, 'MM/DD/YYYY HH:mm:ss');
  return d.format('YYYY-MM-DD');
}
