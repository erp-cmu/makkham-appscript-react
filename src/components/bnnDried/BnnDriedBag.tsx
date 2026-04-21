import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { useBnnDriedBag } from '../../hooks/useBnnDriedHooks';

function BnnDriedBag() {
  const { data } = useBnnDriedBag();

  const columnsName = [
    '[bnn_dried_bag]_date_dried',
    '[bnn_dried_bag]_bag_id',
    'lot_number_date',
    '[bnn_dried_bag]_weight',
    // '[bnn_dried_bag]_id',
    // '[bnn_dried_bag]_date_transaction',
    // '[bnn_dried_bag]_lot_number_raw',
    // '[bnn_dried_bag]_furnace',
    // '[bnn_dried_bag]_counter',
    // '[bnn_pass_1_bag]_id',
    // '[bnn_pass_1_bag]_date',
    // '[bnn_pass_1_bag]_bnn_dried_bag',
    // '[bnn_pass_1_bag]_weight_bnn_dried_bag',
    // '[bnn_pass_1_bag]_weight_pass_1',
    // '[bnn_pass_1_bag]_weight_to_fix',
    // '[bnn_pass_1_bag]_weight_waste',
    // '[bnn_pass_1_bag]_bag_id',
    // '[bnn_pass_1_bag]_weight_pass_1_remaining',
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
    '[bnn_dried_bag]_date_dried': 'วันที่ตากแห้ง',
    '[bnn_dried_bag]_bag_id': 'รหัสถุง',
    lot_number_date: 'เลขที่ล็อต + วันที่',
    '[bnn_dried_bag]_weight': 'นำ้หนัก',
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
export default BnnDriedBag;
