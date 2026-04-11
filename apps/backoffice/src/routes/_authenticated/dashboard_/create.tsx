import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { useCreateGachaItem } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/dashboard_/create')({
  component: DashboardCreatePage,
})

function DashboardCreatePage() {
  const navigate = useNavigate()
  const createItem = useCreateGachaItem()

  const form = useForm<{ itemName: string; quantity: number; foto?: FileList }>({
    mode: 'all',
    defaultValues: { itemName: '', quantity: 1 },
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
        weight: 1,
        stock: data.quantity ?? 1,
        is_limited: false,
      })
      toast.success('Item ditambahkan ke gacha item')
      navigate({ to: '/dashboard' })
    } catch (error) {
      console.log(error)
      toast.error('Item gagal ditambahkan ke gacha item')
    }
  })

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Item Gacha</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Nama Hadiah"
              name="itemName"
              type="text"
              placeholder="Masukkan Nama Hadiah"
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
              label="Foto Barang"
              type="file"
              name="foto"
              placeholder=".jpg, .jpeg, atau .png"
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
                onClick={() => navigate({ to: '/dashboard' })}
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
