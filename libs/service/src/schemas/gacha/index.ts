import { z } from 'zod';

export const gachaRollItemSchema = z.object({
  itemName: z
    .string({
      required_error: 'Nama item tidak boleh kosong',
      invalid_type_error: 'Nama item harus berupa string',
    })
    .min(1, 'Nama item tidak boleh kosong'),
  quantity: z
    .number({
      required_error: 'Quantity tidak boleh kosong',
      invalid_type_error: 'Quantity harus berupa angka',
    })
    .min(1, 'Quantity paling sedikit adalah 1'),
  chanceRate: z
    .number({
      required_error: 'Chance rate tidak boleh kosong',
      invalid_type_error: 'Chance rate harus berupa angka',
    })
    .min(0.1, 'Chance rate paling sedikit adalah 0,1')
    .max(1, 'Chance rate paling banyak adalah 1'),
});
