import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@imphnen-frontend-service/ui/organisms'
import {
  campaignService,
  Campaign,
  CreateCampaignRequest,
} from '../../../app/features/admin/api/campaign.service'
import {
  DeleteOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  FileOutlined,
} from '@ant-design/icons'

export const Route = createFileRoute('/_authenticated/admin/campaigns')({
  component: CampaignsPage,
})

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [formData, setFormData] = useState<CreateCampaignRequest>({
    name: '',
    url: '',
  })

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await campaignService.getCampaigns()
      setCampaigns(data)
    } catch (err) {
      setError('Failed to load campaigns')
      console.error('Error fetching campaigns:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setCreateLoading(true)
      await campaignService.createCampaign(formData)
      setShowCreateModal(false)
      setFormData({ name: '', url: '' })
      await fetchCampaigns()
    } catch (err) {
      console.error('Error creating campaign:', err)
      alert('Failed to create campaign')
    } finally {
      setCreateLoading(false)
    }
  }

  const handleActivateCampaign = async (campaignId: string) => {
    try {
      await campaignService.activateCampaign(campaignId)
      await fetchCampaigns()
    } catch (err) {
      console.error('Error activating campaign:', err)
      alert('Failed to activate campaign')
    }
  }

  const handleDeleteCampaign = async (
    campaignId: string,
    campaignName: string
  ) => {
    if (!confirm(`Are you sure you want to delete "${campaignName}"?`)) {
      return
    }
    try {
      await campaignService.deleteCampaign(campaignId)
      await fetchCampaigns()
    } catch (err) {
      console.error('Error deleting campaign:', err)
      alert('Failed to delete campaign')
    }
  }

  const columns: ColumnDef<Campaign>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => (
        <a
          href={row.original.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          {row.original.url}
        </a>
      ),
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-2xl text-xs font-medium ${
            row.original.is_active
              ? 'bg-success-100 text-success-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.original.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => (
        <span className="text-gray-600">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          {!row.original.is_active && (
            <button
              onClick={() => handleActivateCampaign(row.original.id)}
              className="p-2 text-success-600 hover:bg-success-50 rounded-md transition-colors cursor-pointer"
              title="Activate Campaign"
            >
              <CheckCircleOutlined />
            </button>
          )}
          <button
            onClick={() =>
              handleDeleteCampaign(row.original.id, row.original.name)
            }
            className="p-2 text-danger-600 hover:bg-danger-50 rounded-md transition-colors cursor-pointer"
            title="Delete Campaign"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-gray-600">Loading campaigns...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your QR campaigns</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
        >
          <PlusOutlined />
          Create Campaign
        </button>
      </div>

      {!campaigns || campaigns.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <div className="text-gray-400 mb-4">
              <FileOutlined className="text-[48px] mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No campaigns yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first QR campaign.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
            >
              <PlusOutlined />
              Create Your First Campaign
            </button>
          </div>
        </div>
      ) : (
        <DataTable data={campaigns} columns={columns} pageSize={10} />
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="IMPHNEN Promo Campaign"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://imphnen.dev/promo"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setFormData({ name: '', url: '' })
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                  disabled={createLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={createLoading}
                >
                  {createLoading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
