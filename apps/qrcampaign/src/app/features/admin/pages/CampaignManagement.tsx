import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  url: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

interface CreateCampaignInputs {
  name: string;
  url: string;
}

export const CampaignManagement = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCampaignInputs>();

  const {
    data: campaigns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8080/api/v1/campaigns');
      return res.data.data as Campaign[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateCampaignInputs) => {
      await axios.post('http://localhost:8080/api/v1/campaigns', data);
    },
    onSuccess: () => {
      toast.success('Campaign created successfully');
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      setIsCreateModalOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create campaign');
    },
  });

  const activateMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.put(`http://localhost:8080/api/v1/campaigns/${id}/activate`);
    },
    onSuccess: () => {
      toast.success('Campaign activated');
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['active-campaign-qr'] });
    },
    onError: () => toast.error('Failed to activate campaign'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:8080/api/v1/campaigns/${id}`);
    },
    onSuccess: () => {
      toast.success('Campaign deleted');
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: () => toast.error('Failed to delete campaign'),
  });

  const onCreateSubmit = (data: CreateCampaignInputs) => {
    createMutation.mutate(data);
  };

  if (isLoading) return <div>Loading campaigns...</div>;
  if (isError) return <div>Error loading campaigns.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Campaigns</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + New Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {campaigns?.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {campaign.name}
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">
                  {campaign.url}
                </td>
                <td className="px-6 py-4">
                  {campaign.is_active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {!campaign.is_active && (
                    <button
                      onClick={() => activateMutation.mutate(campaign.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this campaign?'
                        )
                      ) {
                        deleteMutation.mutate(campaign.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {campaigns?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No campaigns found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-slate-900">
              Create New Campaign
            </h3>
            <form onSubmit={handleSubmit(onCreateSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                  placeholder="e.g. Summer Sale 2026"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Target URL
                </label>
                <input
                  type="url"
                  {...register('url', { required: 'URL is required' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                  placeholder="https://example.com/promo"
                />
                {errors.url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.url.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
