import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { InputField } from '@imphnen-frontend-service/ui/molecules'
import {
  useUserList,
  useUpdateUserById,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/accounts/$id')({
  component: AccountsEditPage,
})

function AccountsEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateUser = useUpdateUserById()

  const { data: usersData, isLoading } = useUserList({ search: '', per_page: 100 })
  const user = usersData?.data?.find((u) => u.id === id)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user) {
      setFullName(user.fullname)
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = async () => {
    try {
      await updateUser.mutateAsync({ id, data: { fullname: fullName, email } })
      toast.success('Data akun berhasil diperbarui')
      navigate({ to: '/accounts' })
    } catch (error) {
      console.log(error)
      toast.error('Data akun gagal diperbarui')
    }
  }

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
            onClick={() => navigate({ to: '/accounts' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Data Akun</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col gap-6">
            <InputField
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              size="lg"
              className="w-full"
            />
            <InputField
              label="Email"
              type="text"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              className="w-full"
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
              >
                Perbarui Data
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/accounts' })}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
