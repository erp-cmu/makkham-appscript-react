export const sheetNames = [
  "bnn_dried_bag",
  "bnn_pass_1_bag",
  "bnn_pass_2_bag",
  "packing_ledger",
  "bnn_pass_1_item",
  "bnn_pass_2_item",
  "product_item",
  "lot_number_product",
  "lot_number_raw",
  "product",
  "furnace",
] as const;

export type SheetNames = (typeof sheetNames)[number];
