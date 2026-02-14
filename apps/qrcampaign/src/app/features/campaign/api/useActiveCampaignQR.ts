import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useActiveCampaignQR = () => {
  return useQuery({
    queryKey: ['active-campaign-qr'],
    queryFn: async () => {
      // Assuming backend is running on localhost:8080
      // In production, this should be an env var or relative path if proxied
      const response = await axios.get('http://localhost:8080/api/v1/campaigns/active/qr', {
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
