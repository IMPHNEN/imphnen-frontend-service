import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useActiveCampaignQR = () => {
  return useQuery({
    queryKey: ['active-campaign-qr'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8080/api/v1/campaigns/active/qr', {
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    },
    staleTime: 1000 * 60 * 5,
  });
};
