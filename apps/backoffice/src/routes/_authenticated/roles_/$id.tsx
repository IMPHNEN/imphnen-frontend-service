import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import {
  useRoleList,
  useUpdateRole,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/roles_/$id')({
  component: RolesEditPage,
})

function RolesEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateRole = useUpdateRole()

  const { data: rolesData, isLoading } = useRoleList({ search: '', per_page: 100 })
  const role = rolesData?.data?.find((r) => r.id === id)

  const form = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (role) {
      form.reset({ name: role.name })
    }
  }, [role])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateRole.mutateAsync({ id, data })
      toast.success('Perubahan role berhasil dilakukan')
      navigate({ to: '/roles' })
    } catch (error) {
      console.log(error)
      toast.error('Perubahan role gagal dilakukan')
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
            onClick={() => navigate({ to: '/roles' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Role</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Nama Role"
              name="name"
              type="text"
              placeholder="Masukkan Nama Role"
              size="lg"
              className="w-full"
            />

            <div className="flex flex-col gap-4 items-start overflow-auto">
              <span className="text-p3 font-medium text-neutral-800 sticky left-0">
                Permissions
              </span>
              <div className="flex gap-x-6 overflow-x-auto">
                {['Gacha Items', 'Gacha Roll', 'Roll', 'Users', 'Gacha Claim'].map(
                  (title) => (
                    <div
                      key={title}
                      className="flex flex-col gap-4 select-none text-label2 font-medium text-neutral-900"
                    >
                      <span className="text-nowrap text-label1">{title}</span>
                      <div className="flex gap-[8px] items-center">
                        <input
                          type="checkbox"
                          id={`${title}-all`}
                          className="rounded"
                        />
                        <label htmlFor={`${title}-all`} className="text-nowrap">
                          Check All
                        </label>
                      </div>
                      <hr className="border-blue-200" />
                      <div className="flex flex-col items-start gap-4 mb-4">
                        <div className="flex gap-[8px] items-center">
                          <input type="checkbox" id={"${title}-read"} />
                          <label htmlFor={`${title}-read`}>Read</label>
                        </div>
                        <div className="flex gap-[8px] items-center">
                          <input type="checkbox" id={"${title}-create"} />
                          <label htmlFor={`${title}-create`}>Create</label>
                        </div>
                        <div className="flex gap-[8px] items-center">
                          <input type="checkbox" id={"${title}-update"} />
                          <label htmlFor={`${title}-update`}>Update</label>
                        </div>
                        <div className="flex gap-[8px] items-center">
                          <input type="checkbox" id={"${title}-delete"} />
                          <label htmlFor={`${title}-delete`}>Delete</label>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
              >
                Update Role
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/roles' })}
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
