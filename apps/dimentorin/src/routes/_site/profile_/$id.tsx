import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement, useState } from 'react'
import { ProfileForm, ProfileSidebar, ProfileHeader } from './_components'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { NotificationModal, NotificationType } from './_components/modals/notification-modal'
import { ProfileProvider, useProfile } from './_components/contexts/profile-context'
import { EditProfileModal } from './_components/modals/edit-profile-modal'

export const Route = createFileRoute('/_site/profile_/$id')({
  component: ProfileByIdPage,
})

function ProfileByIdPage(): ReactElement {
  const { id } = Route.useParams()

  if (!id) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Profile ID not found.</p>
        </div>
      </main>
    )
  }

  return (
    <ProfileProvider profileId={id} profileType="user">
      <ProfileByIdContent />
    </ProfileProvider>
  )
}

const ProfileByIdContent: FC = (): ReactElement => {
  const { profileData, isLoading, error, profileType } = useProfile()

  const [notification, setNotification] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    title: string
    message?: string
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  })

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)

  const getProfileTitle = () => {
    if (profileData?.fullname) {
      return `${profileData.fullname}'s Profile`
    }
    return profileType === 'user' ? 'User Profile' : 'Mentor Profile'
  }

  const showNotification = (type: NotificationType['type'], title: string, message?: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }))
  }

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true)
  }

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false)
  }

  const isViewOnly = true

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Failed to load profile</p>
          <p className="text-gray-600 mt-2">Profile not found or you don't have permission to view it.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="">
        <div className="w-full px-8 md:px-[60px] lg:px-20 py-4">
          <div className="max-w-7xl mx-auto">
            <Button variant="primary" className="flex items-center gap-2">
              <ArrowLeftOutlined />
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-8 md:px-[60px] lg:px-20 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {getProfileTitle()}
          </h1>
        </div>
      </div>

      <div className="w-full px-8 md:px-[60px] lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <ProfileHeader onEditProfileClick={openEditProfileModal} isViewOnly={isViewOnly} />
            </div>
            <div className="lg:col-span-8 order-1">
              <ProfileForm
                showNotification={showNotification}
                isViewOnly={isViewOnly}
              />
            </div>

            <div className="lg:col-span-4 order-2">
              <ProfileSidebar
                showNotification={showNotification}
                isViewOnly={isViewOnly}
              />
            </div>
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        header="Profile"
      />
      {!isViewOnly && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={closeEditProfileModal}
          showNotification={showNotification}
        />
      )}
    </main>
  )
}
