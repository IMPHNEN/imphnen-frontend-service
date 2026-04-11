import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  PlusOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { Fragment, useState } from 'react'
import {
  useUserList,
  useGachaItemList,
  useDeleteGachaItem,
  TGachaItemDto,
} from '@imphnen-frontend-service/service'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: usersData } = useUserList({ per_page: 1 })
  const { data: gachaItemsData } = useGachaItemList({ per_page: 9 })
  const deleteItem = useDeleteGachaItem()

  const totalUsers = usersData?.meta?.total ?? 0
  const gachaItems: TGachaItemDto[] = gachaItemsData?.data ?? []

  const handleDelete = async (id: string) => {
    try {
      await deleteItem.mutateAsync(id)
      toast.success('Item berhasil dihapus')
      setDeleteId(null)
    } catch (error) {
      console.log(error)
      toast.error('Item gagal dihapus')
    }
  }

  return (
    <Fragment>
      <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
        <header className="bg-white py-4 px-8 rounded-lg shadow p-4">
          <h1 className="text-p2 font-semibold">Dashboard</h1>
        </header>

        <div className="flex justify-between gap-[40px] p-8 bg-white rounded-md">
          <div className="w-full flex flex-col gap-[40px]">
            <section>
              <h2 className="text-p2 font-medium text-primary-500 mb-8">
                Summary
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm py-4 px-6 flex items-center border border-neutral-100">
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded-md">
                    <UsergroupAddOutlined className="text-[20px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-p1 font-semibold">{totalUsers}</h3>
                    <p className="text-label1 text-neutral-500">Participants</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm py-4 px-6 flex items-center border border-neutral-100">
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded-md">
                    <ReloadOutlined className="text-[20px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-p1 font-semibold">{gachaItemsData?.meta?.total ?? 0}</h3>
                    <p className="text-label1 text-neutral-500">
                      Gacha Items
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm py-4 px-6 flex items-center border border-neutral-100">
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded-md">
                    <UserSwitchOutlined className="text-[20px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-p1 font-semibold">-</h3>
                    <p className="text-label1 text-neutral-500">Redeem</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm py-4 px-6 flex items-center border border-neutral-100">
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded-md">
                    <UsergroupDeleteOutlined className="text-[20px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-p1 font-semibold">-</h3>
                    <p className="text-label1 text-neutral-500">
                      Inactive Users
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-p2 font-medium text-primary-500">
                  Gacha Items
                </h2>
                <Button
                  variant="primary"
                  size="sm"
                  className="items-end gap-3"
                  onClick={() => navigate({ to: '/dashboard/create' })}
                >
                  <span>Tambah Item</span>
                  <PlusOutlined className="text-[16px]" />
                </Button>
              </div>

              <div className="flex flex-col gap-4 max-h-140 overflow-auto">
                {gachaItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white overflow-clip rounded-lg shadow-sm flex justify-between border border-neutral-100"
                  >
                    <div className="flex flex-col py-4 px-6 gap-[8px]">
                      <div>
                        <h3 className="text-p3 text-primary-500 font-medium">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-start gap-10 text-label2 text-gray-500 mt-1">
                          <span>{item.id}</span>
                        </div>
                      </div>
                      <div className="flex justify-start gap-2">
                        <Button
                          variant="text"
                          size="sm"
                          className="text-[10px] text-neutral-500 p-0 font-normal hover:bg-transparent hover:text-primary-500"
                          onClick={() => navigate({ to: '/dashboard/$id', params: { id: item.id } })}
                        >
                          Edit
                        </Button>
                        {deleteId === item.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-neutral-400">Yakin?</span>
                            <Button
                              variant="text"
                              size="sm"
                              className="text-[10px] text-red-500 p-0 font-normal hover:bg-transparent hover:text-red-700"
                              onClick={() => handleDelete(item.id)}
                            >
                              Ya
                            </Button>
                            <Button
                              variant="text"
                              size="sm"
                              className="text-[10px] text-neutral-500 p-0 font-normal hover:bg-transparent"
                              onClick={() => setDeleteId(null)}
                            >
                              Batal
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="text"
                            size="sm"
                            className="text-[10px] text-red-500 p-0 font-normal hover:bg-transparent hover:text-red-700"
                            onClick={() => setDeleteId(item.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>

                    <img src="gacha-clip.webp" alt={item.name} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <img
            src="gacha.webp"
            alt=""
            className="rounded-lg hidden xl:block xl:min-w-[436px] h-auto object-cover"
          />
        </div>
      </main>
    </Fragment>
  )
}
