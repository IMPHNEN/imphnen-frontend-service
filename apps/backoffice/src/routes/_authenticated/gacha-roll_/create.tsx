import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { useCreateGachaItem } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/gacha-roll/create')({
  component: GachaRollCreatePage,
})

function GachaRollCreatePage() {
  const navigate = useNavigate()
  const createItem = useCreateGachaItem()

  const form = useForm<{ itemName: string; quantity: number; chanceRate: number }>({
    mode: 'all',
    defaultValues: { itemName: '', quantity: 1, chanceRate: 0.1 },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createItem.mutateAsync({
        item_code: (data.itemName as string).toLowerCase().replace(/\s+/g, '-'),
        name: data.itemName,
        description: '',
        rarity: 'common',
        type_: 'physical',
        category: 'merchandise',
        value: 0,
        weight: data.chanceRate ?? 1,
        stock: data.quantity ?? 1,
        is_limited: false,
      })
      toast.success('Item ditambahkan ke roll gacha')
      navigate({ to: '/gacha-roll' })
    } catch (error) {
      console.log(error)
      toast.error('Item gagal ditambahkan ke roll gacha')
    }
  })

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
          <h1 className="text-2xl font-bold text-gray-900">Tambah Item Roll Gacha</h1>
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
                Tambahkan Item
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
