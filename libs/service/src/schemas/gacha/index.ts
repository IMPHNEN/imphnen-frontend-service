import { z } from 'zod';

export const gachaItemSchema = z.object({
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
  foto: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000, // 5MB in bytes
      'Ukuran file maksimal 5MB'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Format file harus JPG, PNG, atau WEBP'
    )
});

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
