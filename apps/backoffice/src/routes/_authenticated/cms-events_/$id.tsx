import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import {
  useEventList,
  useUpdateEvent,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/cms-events/$id')({
  component: CmsEventsEditPage,
})

function CmsEventsEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateEvent = useUpdateEvent()

  const { data: eventsData, isLoading } = useEventList({ search: '', per_page: 100 })
  const event = eventsData?.data?.find((e) => e.id === id)

  const form = useForm<{
    name: string
    description: string
    detail_link: string
    location: string
    price: number
    start_date: string
    end_date: string
    is_online: boolean
  }>({
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      detail_link: '',
      location: '',
      price: 0,
      start_date: '',
      end_date: '',
      is_online: false,
    },
  })

  useEffect(() => {
    if (event) {
      form.reset({
        name: event.name,
        description: event.description,
        detail_link: event.detail_link,
        location: event.location,
        price: event.price,
        start_date: event.start_date,
        end_date: event.end_date,
        is_online: event.is_online,
      })
    }
  }, [event])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateEvent.mutateAsync({ id, data })
      toast.success('Perubahan event berhasil dilakukan')
      navigate({ to: '/cms-events' })
    } catch (error) {
      console.log(error)
      toast.error('Perubahan event gagal dilakukan')
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
            onClick={() => navigate({ to: '/cms-events' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Nama Event"
              name="name"
              type="text"
              placeholder="Masukkan Nama Event"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Deskripsi"
              name="description"
              type="text"
              placeholder="Masukkan Deskripsi Event"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Link Detail"
              name="detail_link"
              type="text"
              placeholder="Masukkan Link Detail"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Lokasi"
              name="location"
              type="text"
              placeholder="Masukkan Lokasi"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Harga"
              name="price"
              type="number"
              placeholder="Masukkan Harga"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Tanggal Mulai"
              name="start_date"
              type="date"
              placeholder="Pilih Tanggal Mulai"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Tanggal Selesai"
              name="end_date"
              type="date"
              placeholder="Pilih Tanggal Selesai"
              size="lg"
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_online_update"
                className="rounded"
                {...form.register('is_online')}
              />
              <label htmlFor="is_online_update" className="text-p3 font-medium text-neutral-800">
                Event Online
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
              >
                Update Event
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/cms-events' })}
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
