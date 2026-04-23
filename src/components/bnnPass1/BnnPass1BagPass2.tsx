import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { useBnnPass1 } from '../../hooks/useBnnDriedHooks';

function BnnPass1BagPass2() {
  const { data } = useBnnPass1();

  const columnsName = [
    // '[bnn_dried_bag]_bag_id',
    '[bnn_pass_1_bag]_bag_id',
    '[bnn_pass_2_bag]_bag_id',
    '[bnn_pass_2_bag]_original_weight_to_fix',
    '[bnn_pass_2_bag]_weight_pass_2',
    '[bnn_pass_2_bag]_weight_waste',
    '[bnn_pass_2_bag]_weight_pass_2_remaining',
    // '[bnn_pass_2_bag]_bnn_pass_1_bag',
    // '[bnn_pass_1_bag]_weight_bnn_dried_bag',
    // '[bnn_pass_1_bag]_weight_pass_1',
    // '[bnn_pass_1_bag]_weight_to_fix',
    // '[bnn_pass_1_bag]_weight_waste',
    // '[bnn_pass_1_bag]_weight_pass_1_remaining',
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
    // '[lot_number_raw]_lot_number',
    // '[lot_number_raw]_date',
  ];

  const colTitle = {
    '[bnn_pass_1_bag]_bag_id': 'รหัสถุงคัด 1',
    '[bnn_pass_2_bag]_bag_id': 'รหัสถุงคัด 2',
    '[bnn_pass_2_bag]_original_weight_to_fix': 'น้ำหนักที่ต้องซ่อม',
    '[bnn_pass_2_bag]_weight_pass_2': 'น้ำหนักคัด 2',
    '[bnn_pass_2_bag]_weight_waste': 'น้ำหนักของเสีย',
    '[bnn_pass_2_bag]_weight_pass_2_remaining': 'น้ำหนักคัด 2 ที่เหลือ',
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
export default BnnPass1BagPass2;
