import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { useBnnDriedBag } from '../../hooks/useBnnDriedHooks';

function BnnDriedBagPass1() {
  const { data } = useBnnDriedBag();

  const columnsName = [
    '[bnn_dried_bag]_bag_id',
    '[bnn_pass_1_bag]_bag_id',
    '[bnn_pass_1_bag]_weight_bnn_dried_bag',
    '[bnn_pass_1_bag]_weight_pass_1',
    '[bnn_pass_1_bag]_weight_to_fix',
    '[bnn_pass_1_bag]_weight_waste',
    '[bnn_pass_1_bag]_weight_pass_1_remaining',
    // '[bnn_dried_bag]_id',
    // '[bnn_dried_bag]_date_dried',
    // 'lot_number_date',
    // '[bnn_dried_bag]_weight',
    // '[bnn_dried_bag]_date_transaction',
    // '[bnn_dried_bag]_lot_number_raw',
    // '[bnn_dried_bag]_furnace',
    // '[bnn_dried_bag]_counter',
    // '[bnn_pass_1_bag]_id',
    // '[bnn_pass_1_bag]_date',
    // '[bnn_pass_1_bag]_bnn_dried_bag',
    // '[bnn_pass_2_bag]_id',
    // '[bnn_pass_2_bag]_date',
    // '[bnn_pass_2_bag]_bnn_pass_1_bag',
    // '[bnn_pass_2_bag]_original_weight_to_fix',
    // '[bnn_pass_2_bag]_weight_pass_2',
    // '[bnn_pass_2_bag]_weight_waste',
    // '[bnn_pass_2_bag]_bag_id',
    // '[bnn_pass_2_bag]_weight_pass_2_remaining',
    // '[lot_number_raw]_lot_number',
    // '[lot_number_raw]_date',
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
export default BnnDriedBagPass1;
