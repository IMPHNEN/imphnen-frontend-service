import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement, useState } from 'react'
import { ProfileForm, ProfileSidebar, ProfileHeader } from './profile_/_components'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { NotificationModal, NotificationType } from './profile_/_components/modals/notification-modal'
import { ProfileProvider, useProfile } from './profile_/_components/contexts/profile-context'
import { EditProfileModal } from './profile_/_components/modals/edit-profile-modal'

export const Route = createFileRoute('/_site/profile')({
  component: ProfilePage,
})

function ProfilePage(): ReactElement {
  return (
    <ProfileProvider profileType="user">
      <ProfileContent />
    </ProfileProvider>
  )
}

const ProfileContent: FC = (): ReactElement => {
  const { isLoading, error } = useProfile()

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
          <p className="text-gray-600 mt-2">Please try again later.</p>
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
          <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
        </div>
      </div>

      <div className="w-full px-8 md:px-[60px] lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <ProfileHeader onEditProfileClick={openEditProfileModal} />
            </div>
            <div className="lg:col-span-8 order-1">
              <ProfileForm showNotification={showNotification} />
            </div>

            <div className="lg:col-span-4 order-2">
              <ProfileSidebar showNotification={showNotification} />
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
      {}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={closeEditProfileModal}
        showNotification={showNotification}
      />
    </main>
  )
}
