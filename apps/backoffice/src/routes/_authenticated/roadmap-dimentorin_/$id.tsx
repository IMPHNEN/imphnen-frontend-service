import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { useRoadmapList, useUpdateRoadmap, TRoadmapStatus } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/roadmap-dimentorin_/$id')({
  component: RoadmapEditPage,
})

function RoadmapEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateRoadmap = useUpdateRoadmap()

  const { data: roadmapData, isLoading } = useRoadmapList()
  const roadmap = roadmapData?.find((r) => r.id === id)

  const form = useForm<{
    title: string
    description: string
    status: TRoadmapStatus
  }>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      status: 'upcoming',
    },
  })

  useEffect(() => {
    if (roadmap) {
      form.reset({
        title: roadmap.title,
        description: roadmap.description,
        status: roadmap.status,
      })
    }
  }, [roadmap])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateRoadmap.mutateAsync({ id, data })
      toast.success('Roadmap berhasil diperbarui')
      navigate({ to: '/roadmap-dimentorin' })
    } catch (error) {
      console.log(error)
      toast.error('Gagal memperbarui roadmap')
    }
  })

  if (isLoading) {
    return (
      <main className="w-full px-[48px] py-[40px]">
        <div className="text-center py-8 text-neutral-400">Loading...</div>
      </main>
    )
  }

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/roadmap-dimentorin' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Roadmap</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Title"
              name="title"
              type="text"
              placeholder="Masukkan judul roadmap"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Description"
              name="description"
              type="text"
              placeholder="Masukkan deskripsi roadmap"
              size="lg"
              className="w-full"
            />
            <div className="flex flex-col gap-2">
              <label className="text-p3 font-medium text-neutral-800">Status</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-p3 focus:border-primary-500 focus:outline-none"
                {...form.register('status')}
              >
                <option value="upcoming">Upcoming</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
              >
                Update Roadmap
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/roadmap-dimentorin' })}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
