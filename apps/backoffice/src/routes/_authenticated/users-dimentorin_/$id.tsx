import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Button, Input } from '@imphnen-frontend-service/ui/atoms'
import { cn, For, Show } from '@imphnen-frontend-service/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  useMentorById,
  useUserById,
  useDeleteMentor,
  MentorDetailResponseDto,
} from '@imphnen-frontend-service/service'

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

const SOCIAL_LINKS = [
  { icon: <Icon icon="mdi:linkedin" className="text-2xl" />, key: "linkedin_url", label: "LinkedIn" },
  { icon: <Icon icon="mdi:github" className="text-2xl" />, key: "github_url", label: "Github" },
  { icon: <Icon icon="mingcute:meta-line" className="text-2xl" />, key: "portfolio_url", label: "Portfolio" },
]

const TABS = {
  account: 'account profile',
  detail: 'detail profile',
} as const
type TabType = typeof TABS[keyof typeof TABS]

export const Route = createFileRoute('/_authenticated/users-dimentorin_/$id')({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>(TABS.account)
  const deleteMentor = useDeleteMentor()

  const { data: mentorData, isLoading: mentorLoading } = useMentorById(id)
  const { data: userData, isLoading: userLoading } = useUserById(id)

  const mentor: MentorDetailResponseDto | undefined = mentorData
  const user = userData?.data

  const isLoading = mentorLoading && userLoading
  const displayName = mentor?.fullname ?? user?.fullname ?? '-'
  const email = mentor?.email ?? user?.email ?? '-'

  const handleDelete = async () => {
    try {
      await deleteMentor.mutateAsync(id)
      toast.success('Akun berhasil dihapus')
      navigate({ to: '/users-dimentorin' })
    } catch (error) {
      console.log(error)
      toast.error('Gagal menghapus akun')
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
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/users-dimentorin' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Detail - {displayName}</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
            Detail - {displayName}
          </h2>

          <div className="flex gap-2 bg-primary-100 p-1.5 rounded-md w-max mb-8">
            <For data={Object.values(TABS)}>
              {(tab) => (
                <Button
                  key={tab}
                  variant="text"
                  className={cn('px-3 py-2 capitalize', activeTab === tab && 'bg-white')}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              )}
            </For>
          </div>

          <Show condition={activeTab === TABS.account}>
            <div>
              <div className="flex items-center gap-x-8 mb-8">
                <div className="size-[100px] rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full object-cover" />
                  ) : (
                    <Icon icon="mdi:account" className="text-4xl text-neutral-400" />
                  )}
                </div>
                <div>
                  <p className="text-p2 font-semibold">{displayName}</p>
                  <p className="text-neutral-400 font-medium">{email}</p>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h3 className="mb-7 text-p2 font-semibold">Informasi Pribadi</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass}>Nama Lengkap</label>
                      <Input type="text" className="min-w-full w-full" value={displayName} readOnly />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <Input type="email" className="min-w-full w-full" value={email} readOnly />
                    </div>
                    <div>
                      <label className={labelClass}>Status</label>
                      <Input
                        type="text"
                        className="min-w-full w-full"
                        value={mentor?.status ?? (user?.is_active ? 'active' : 'inactive')}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Gender</label>
                      <Input
                        type="text"
                        className="min-w-full w-full"
                        value={mentor?.gender ?? user?.profile_extension?.gender ?? '-'}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-7 text-p2 font-semibold">Status Akun</h3>
                  <div className="flex items-center gap-5">
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={handleDelete}
                    >
                      Delete Akun
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-x-5 mt-8">
                  <Button type="button" variant="bordered" onClick={() => navigate({ to: "/users-dimentorin" })}>
                    Kembali
                  </Button>
                </div>
              </div>
            </div>
          </Show>

          <Show condition={activeTab === TABS.detail}>
            <div>
              <div className="shadow rounded-lg p-8 mb-7">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-x-6">
                    <div className="size-[54px] rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full object-cover" />
                      ) : (
                        <Icon icon="mdi:account" className="text-2xl text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-p2 font-semibold text-neutral-800">{displayName}</h3>
                      <p className="text-p3 font-medium text-neutral-600">
                        {mentor ? `${mentor.current_role ?? ``} at ${mentor.current_company ?? ``}` : user?.role?.name ?? `-`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <For data={SOCIAL_LINKS}>
                    {({ icon, key, label }) => {
                      const url = mentor?.[key as keyof MentorDetailResponseDto] as string | undefined
                      if (!url) return null
                      return (
                        <a key={key} href={url} target="_blank" rel="noreferrer">
                          <Button type="button" size="sm" className="flex items-center gap-x-2">
                            {icon}
                            {label}
                          </Button>
                        </a>
                      )
                    }}
                  </For>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-7">
                <div className="text-pretty px-8 py-10 rounded-lg shadow h-max">
                  <h3 className="text-p2 font-semibold text-neutral-800 mb-6">Description</h3>
                  <p className="text-p3 font-medium text-neutral-600">
                    {mentor?.bio ?? user?.profile_extension?.bio ?? 'Tidak ada deskripsi.'}
                  </p>
                </div>
                <div className="px-8 py-10 rounded-lg shadow h-max">
                  <h3 className="text-p2 font-semibold text-neutral-800 mb-6">Personal Informations</h3>
                  <div className="grid gap-6">
                    <div className="flex items-center gap-x-5">
                      <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                        <Icon icon="ic:outline-mail" className="text-3xl" />
                      </div>
                      <div className="text-p3">
                        <p className="text-neutral-800 font-semibold">{email}</p>
                        <p className="text-neutral-600 font-medium">Email Address</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-5">
                      <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                        <Icon icon="cil:phone" className="text-3xl" />
                      </div>
                      <div className="text-p3">
                        <p className="text-neutral-800 font-semibold">
                          {mentor?.phone_for_verification ?? user?.profile_extension?.phone_number ?? '-'}
                        </p>
                        <p className="text-neutral-600 font-medium">Phone Number</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-5">
                      <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                        <Icon icon="ion:location-outline" className="text-3xl" />
                      </div>
                      <div className="text-p3">
                        <p className="text-neutral-800 font-semibold">
                          {mentor?.domicile ?? user?.profile_extension?.domicile ?? '-'}
                        </p>
                        <p className="text-neutral-600 font-medium">Location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </main>
  )
}
