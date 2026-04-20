import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

import { usePacking } from '../hooks/usePacking';

function Packing() {
  const {
    dataProduct,
    datePackingLedgerList,
    setDatePackingLedger,
    isLoading,
    error,
  } = usePacking();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!dataProduct) {
    return <div>No data available</div>;
  }

  const columnsName = [
    // 'id_packing_ledger',
    'date_packing_ledger',
    // 'date_lot_number_product',
    'id_date_lot_number_product',
    // 'lot_number_product',
    // 'id_product',
    // 'name_product',
    'id_name_product',
    'size_product',
    'quantity_product_item',
    // 'total_weight_pass_1',
    // 'total_weight_pass_2',
    // 'total_weight',
    // 'id_product_item',
    // 'packing_ledger',
  ];

  console.log({ datePackingLedgerList });
  const columns: ColumnDefinition[] = columnsName.map((key) => ({
    title: key,
    field: key,
    formatter: 'textarea',
    resizable: true,
  }));

  return (
    <>
      <select onChange={(e) => setDatePackingLedger(e.target.value)}>
        <option value="">All Dates</option>
        {datePackingLedgerList.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <ReactTabulator
        data={dataProduct}
        columns={columns}
        layout="fitColumns"
      />
    </>
  );
}

export default Packing;
