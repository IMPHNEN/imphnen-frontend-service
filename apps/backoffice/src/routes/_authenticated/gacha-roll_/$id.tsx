import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import {
  useGachaItemList,
  useUpdateGachaItem,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/gacha-roll/$id')({
  component: GachaRollEditPage,
})

function GachaRollEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateItem = useUpdateGachaItem()

  const { data: itemsData, isLoading } = useGachaItemList({ per_page: 100 })
  const item = itemsData?.data?.find((i) => i.id === id)

  const form = useForm<{ itemName: string; quantity: number; chanceRate: number }>({
    mode: 'all',
    defaultValues: { itemName: '', quantity: 1, chanceRate: 0.1 },
  })

  useEffect(() => {
    if (item) {
      form.reset({
        itemName: item.name,
        quantity: item.stock,
        chanceRate: item.weight,
      })
    }
  }, [item])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateItem.mutateAsync({
        id,
        data: {
          name: data.itemName,
          weight: data.chanceRate,
          stock: data.quantity,
        },
      })
      toast.success('Perubahan item roll berhasil dilakukan')
      navigate({ to: '/gacha-roll' })
    } catch (error) {
      console.log(error)
      toast.error('Perubahan item roll gagal dilakukan')
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
            onClick={() => navigate({ to: '/gacha-roll' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Item Roll Gacha</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Pilih Item"
              name="itemName"
              type="text"
              placeholder="Pilih item yang dimasukkan ke roll"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              placeholder="Masukkan Kuantitas Item"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Chance Rate"
              name="chanceRate"
              type="number"
              min={0.1}
              step={0.1}
              max={1}
              placeholder="Masukkan Chance Rate (0,1 - 1)"
              size="lg"
              className="w-full"
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
              >
                Perbarui Item
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/gacha-roll' })}
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
