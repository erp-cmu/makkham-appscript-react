import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { usePackingProduct } from '../../hooks/usePackingHooks';

function PackingProduct() {
  const { data } = usePackingProduct();

  if (!data) {
    return <div>No data available</div>;
  }

  const columnsName = [
    '[packing_ledger]_date',
    'lot_number_product_date',
    'product_id_name',
    '[product]_size',
    '[product_item]_quantity',
    // '[packing_ledger]_id',
    // '[packing_ledger]_total_weight_pass_1',
    // '[packing_ledger]_total_weight_pass_2',
    // '[packing_ledger]_total_weight',
    // '[product_item]_id',
    // '[product_item]_packing_ledger',
    // '[product_item]_product',
    // '[product_item]_lot_number_product',
    // '[lot_number_product]_lot_number',
    // '[lot_number_product]_date',
    // '[product]_id',
    // '[product]_name',
  ];

  const colTitle = {
    '[packing_ledger]_date': 'วันที่',
    lot_number_product_date: 'Lot Number',
    product_id_name: 'Product ID + Name',
    '[product]_size': 'Size',
    '[product_item]_quantity': 'จำนวน',
  } as Record<string, string>;

  const columns: ColumnDefinition[] = columnsName.map((name) => ({
    title: colTitle[name] || name,
    field: name,
    formatter: 'textarea',
    resizable: true,
  }));

  return <ReactTabulator data={data} columns={columns} layout="fitColumns" />;
}

export default PackingProduct;
