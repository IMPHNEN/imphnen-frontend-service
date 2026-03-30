import { api } from '../../auth/api/auth.service';

export interface Campaign {
  id: string;
  name: string;
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignRequest {
  name: string;
  url: string;
}

interface CampaignsResponse {
  success: boolean;
  message: string;
  data: Campaign[];
}

interface CampaignResponse {
  success: boolean;
  message: string;
  data: Campaign;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const campaignService = {
  getCampaigns: async (): Promise<Campaign[]> => {
    const response = await api.get<CampaignsResponse>('/campaigns');
    return response.data.data;
  },

  createCampaign: async (data: CreateCampaignRequest): Promise<Campaign> => {
    const response = await api.post<CampaignResponse>('/campaigns', data);
    return response.data.data;
  },

  activateCampaign: async (campaignId: string): Promise<Campaign> => {
    const response = await api.put<CampaignResponse>(
      `/campaigns/${campaignId}/activate`
    );
    return response.data.data;
  },

  deleteCampaign: async (campaignId: string): Promise<void> => {
    await api.delete<DeleteResponse>(`/campaigns/${campaignId}`);
  },
};
