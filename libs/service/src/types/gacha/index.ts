export type TGachaItemDto = {
  id: string;
  name: string;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TGachaItemCreateRequest = {
  item_code: string;
  name: string;
  description: string;
  rarity: string;
  type_: string;
  category: string;
  value: number;
  weight: number;
  stock: number;
  is_limited: boolean;
  metadata?: Record<string, unknown>;
};

export type TGachaItemUpdateRequest = {
  item_code?: string;
  name?: string;
  description?: string;
  rarity?: string;
  type_?: string;
  category?: string;
  value?: number;
  weight?: number;
  stock?: number;
  is_limited?: boolean;
  metadata?: Record<string, unknown>;
};

export type TGachaRollItemDto = {
  id: string;
  user_id: string;
  gacha_id: string;
  item_id: string;
  weight: number;
  quantity: number;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TGachaRollCreateRequest = {
  item_id: string;
  weight: number;
  quantity: number;
};

export type TGachaCreditDto = {
  id: string;
  user_id: string;
  available_rolls: number;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TGachaCreditAddRequest = {
  amount: number;
};

export type TGachaClaimDetailDto = {
  id: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    avatar?: string;
  };
  item: TGachaItemDto;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type TGachaClaimCreateRequest = {
  user_id: string;
  item_id: string;
};

// Legacy aliases kept for backward compatibility
export type TGachaItem = TGachaItemDto;
export type TGachaRollItem = TGachaRollItemDto;
