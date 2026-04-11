import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { useCreatePermission } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/permissions/create')({
  component: PermissionsCreatePage,
})

function PermissionsCreatePage() {
  const navigate = useNavigate()
  const createPermission = useCreatePermission()

  const form = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: { name: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createPermission.mutateAsync(data)
      toast.success('Data permissions berhasil ditambahkan')
      navigate({ to: '/permissions' })
    } catch (error) {
      console.log(error)
      toast.error('Data permissions gagal ditambahkan')
    }
  })

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/permissions' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Permission</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Name"
              name="name"
              type="text"
              placeholder="Nama Permission"
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
                Tambah Permission
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/permissions' })}
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
