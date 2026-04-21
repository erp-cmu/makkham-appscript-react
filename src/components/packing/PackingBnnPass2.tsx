import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { usePackingBnnPass2 } from '../../hooks/usePackingHooks';

function PackingBnnPass2() {
  const { data } = usePackingBnnPass2();

  if (!data) {
    return <div>No data available</div>;
  }

  const columnsName = [
    '[packing_ledger]_date',
    '[bnn_pass_2_bag]_bag_id',
    '[bnn_pass_2_item]_original_weight_pass_2',
    '[bnn_pass_2_bag]_weight_pass_2_remaining',
    // '[packing_ledger]_id',
    // '[packing_ledger]_total_weight_pass_1',
    // '[packing_ledger]_total_weight_pass_2',
    // '[packing_ledger]_total_weight',
    // '[bnn_pass_2_item]_id',
    // '[bnn_pass_2_item]_packing_ledger',
    // '[bnn_pass_2_item]_bnn_pass_2_bag',
    // '[bnn_pass_2_item]_weight_used',
    // '[bnn_pass_2_item]_weight_remaining',
    // '[bnn_pass_2_bag]_id',
    // '[bnn_pass_2_bag]_date',
    // '[bnn_pass_2_bag]_bnn_pass_1_bag',
    // '[bnn_pass_2_bag]_original_weight_to_fix',
    // '[bnn_pass_2_bag]_weight_pass_2',
    // '[bnn_pass_2_bag]_weight_waste',
  ];

  const colTitle = {
    '[packing_ledger]_date': 'วันที่',
    '[bnn_pass_2_bag]_bag_id': 'Bag ID',
    '[bnn_pass_2_item]_original_weight_pass_2': 'Original Weight Pass 2',
    '[bnn_pass_2_bag]_weight_pass_2_remaining': 'Weight Pass 2 Remaining',
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

export default PackingBnnPass2;
