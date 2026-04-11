import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import {
  usePermissionList,
  useUpdatePermission,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/permissions_/$id')({
  component: PermissionsEditPage,
})

function PermissionsEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updatePermission = useUpdatePermission()

  const { data: permissionsData, isLoading } = usePermissionList({ search: '', per_page: 100 })
  const permission = permissionsData?.data?.find((p) => p.id === id)

  const form = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (permission) {
      form.reset({ name: permission.name })
    }
  }, [permission])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updatePermission.mutateAsync({ id, data })
      toast.success('Perubahan permissions berhasil dilakukan')
      navigate({ to: '/permissions' })
    } catch (error) {
      console.log(error)
      toast.error('Perubahan permissions gagal dilakukan')
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
            onClick={() => navigate({ to: '/permissions' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Permission</h1>
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
                Update Permission
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
