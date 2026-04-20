import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { usePackingBnnPass1 } from '../hooks/usePackingHooks';

function PackingBnnPass1() {
  const { data } = usePackingBnnPass1();

  if (!data) {
    return <div>No data available</div>;
  }

  const columnsName = [
    // '[packing_ledger]_id',
    '[packing_ledger]_date',
    '[bnn_pass_1_bag]_bag_id',
    '[bnn_pass_1_item]_original_weight_pass_1',
    '[bnn_pass_1_bag]_weight_pass_1_remaining',
    // '[packing_ledger]_total_weight_pass_1',
    // '[packing_ledger]_total_weight_pass_2',
    // '[packing_ledger]_total_weight',
    // '[bnn_pass_1_item]_id',
    // '[bnn_pass_1_item]_packing_ledger',
    // '[bnn_pass_1_item]_bnn_pass_1_bag',
    // '[bnn_pass_1_item]_weight_used',
    // '[bnn_pass_1_item]_weight_remaining',
    // '[bnn_pass_1_bag]_id',
    // '[bnn_pass_1_bag]_date',
    // '[bnn_pass_1_bag]_bnn_dried_bag',
    // '[bnn_pass_1_bag]_weight_bnn_dried_bag',
    // '[bnn_pass_1_bag]_weight_pass_1',
    // '[bnn_pass_1_bag]_weight_to_fix',
    // '[bnn_pass_1_bag]_weight_waste',
    // '[bnn_dried_bag]_id',
    // '[bnn_dried_bag]_date_transaction',
    // '[bnn_dried_bag]_date_dried',
    // '[bnn_dried_bag]_lot_number_raw',
    // '[bnn_dried_bag]_furnace',
    // '[bnn_dried_bag]_weight',
    // '[bnn_dried_bag]_counter',
    // '[bnn_dried_bag]_bag_id',
    // '[furnace]_id',
    // '[furnace]_name',
  ];

  const colTitle = {
    '[packing_ledger]_date': 'วันที่',
    '[bnn_pass_1_bag]_bag_id': 'Bag ID',
    '[bnn_pass_1_item]_original_weight_pass_1': 'Original Weight Pass 1',
    '[bnn_pass_1_bag]_weight_pass_1_remaining': 'Weight Pass 1 Remaining',
  } as Record<string, string>;

  const columns: ColumnDefinition[] = columnsName.map((name) => ({
    title: colTitle[name] || name,
    field: name,
    formatter: 'textarea',
    resizable: true,
    hozAlign: 'left',
    bottomCalc: 'sum',
  }));

  return <ReactTabulator data={data} columns={columns} layout="fitColumns" />;
}

export default PackingBnnPass1;
