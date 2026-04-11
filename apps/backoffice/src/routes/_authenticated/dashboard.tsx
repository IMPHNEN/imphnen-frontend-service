import { createFileRoute } from '@tanstack/react-router'
import {
  PlusOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { FC, Fragment, ReactElement, useRef, useState } from 'react'
import ModalAddItem from './_components/dashboard/modal-add-item'
import ModalEditItem from './_components/dashboard/modal-edit-item'
import ModalDeleteItem from './_components/dashboard/modal-delete-item'
import { useQueryState } from '@imphnen-frontend-service/utils'
import {
  useUserList,
  useGachaItemList,
  useCreateGachaItem,
  useUpdateGachaItem,
  useDeleteGachaItem,
  TGachaItemDto,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [showModalAddItem, setShowModalAddItem] = useState(false)
  const [showModalEditItem, setShowModalEditItem] = useState(false)
  const [showModalDeleteItem, setShowModalDeleteItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TGachaItemDto | null>(null)
  const pendingFormData = useRef<any>(null)

  const {
    step: currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useQueryState('step', {
    defaultValue: 1,
    maxValue: 2,
    minValue: 1,
  })

  const { data: usersData } = useUserList({ per_page: 1 })
  const { data: gachaItemsData } = useGachaItemList({ per_page: 9 })
  const createItem = useCreateGachaItem()
  const updateItem = useUpdateGachaItem()
  const deleteItem = useDeleteGachaItem()

  const totalUsers = usersData?.meta?.total ?? 0
  const gachaItems: TGachaItemDto[] = gachaItemsData?.data ?? []

  const handleAdd = async (): Promise<boolean> => {
    if (pendingFormData.current) {
      const { itemName, quantity } = pendingFormData.current
      await createItem.mutateAsync({
        item_code: (itemName as string).toLowerCase().replace(/\s+/g, '-'),
        name: itemName,
        description: '',
        rarity: 'common',
        type_: 'physical',
        category: 'merchandise',
        value: 0,
        weight: 1,
        stock: quantity ?? 1,
        is_limited: false,
      })
    }
    return true
  }

  const handleEdit = async (): Promise<boolean> => {
    if (selectedItem && pendingFormData.current) {
      const { itemName, quantity } = pendingFormData.current
      await updateItem.mutateAsync({
        id: selectedItem.id,
        data: { name: itemName, stock: quantity },
      })
    }
    return true
  }

  const handleDelete = async (): Promise<boolean> => {
    if (selectedItem) {
      await deleteItem.mutateAsync(selectedItem.id)
    }
    return true
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
                  onClick={() => setShowModalAddItem(true)}
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
                          onClick={() => {
                            setSelectedItem(item)
                            setShowModalEditItem(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          size="sm"
                          className="text-[10px] text-red-500 p-0 font-normal hover:bg-transparent hover:text-red-700"
                          onClick={() => {
                            setSelectedItem(item)
                            setShowModalDeleteItem(true)
                          }}
                        >
                          Delete
                        </Button>
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

      <ModalAddItem
        currentStep={currentStep}
        isOpen={showModalAddItem}
        onClose={() => setShowModalAddItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleAddItem={handleAdd}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />

      <ModalEditItem
        currentStep={currentStep}
        isOpen={showModalEditItem}
        onClose={() => setShowModalEditItem(false)}
        nextStep={nextStep}
        prevStep={prevStep}
        resetStep={resetStep}
        handleEditItem={handleEdit}
        initialValues={selectedItem ? { itemName: selectedItem.name } : undefined}
        onDataCapture={(data) => { pendingFormData.current = data }}
      />

      <ModalDeleteItem
        isOpen={showModalDeleteItem}
        onClose={() => setShowModalDeleteItem(false)}
        handleDeleteItem={async () => { await handleDelete(); return true }}
      />
    </Fragment>
  )
}
